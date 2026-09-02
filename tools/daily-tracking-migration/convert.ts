/**
 * One tracked day in markdown becomes one akasha page and the two files beside it.
 *
 * Everything here is a function from a value to a value. Nothing reads a file, writes one, or mints
 * an identity of its own — the mint is handed in — so the whole conversion can be proved against
 * copies in /tmp without the corpus being touched.
 */

import {
  COMPLETED_TASKS_SLUG,
  DAY_FIELD_BY_KEY,
  DAY_FIELDS,
  DAY_PAGE_TYPE,
  DAY_REFERENCE_KEY,
  DECLARING_IMPORT,
  DECLARING_TYPE,
  ENTRY_EXTENSION,
  SESSIONS_SLUG,
  SLUG_PREFIX,
} from "./shape.ts"

export type JsonObject = Readonly<Record<string, unknown>>

/** One jsonl line as it stands, and the row it parsed to. */
export type SourceRow = {
  readonly raw: string
  readonly row: JsonObject
}

export type DaySource = {
  /** The date the file name carries, `2026-03-05`. */
  readonly day: string
  readonly frontmatter: JsonObject
  readonly sessions: readonly SourceRow[]
  readonly completedTasks: readonly SourceRow[]
}

export type EntryFile = {
  /** The file name beside the page, with no directory on it. */
  readonly name: string
  readonly text: string
  readonly rows: number
  /** How many rows had their day reference re-pointed. */
  readonly repointed: number
}

export type Converted = {
  readonly day: string
  readonly slug: string
  readonly exportName: string
  /** The page file's name, with no directory on it. */
  readonly pageName: string
  readonly pageText: string
  /** The page's value, camel-keyed, as the rendered file declares it. */
  readonly value: JsonObject
  readonly idWas: string
  readonly idIs: string
  readonly reminted: boolean
  readonly entries: readonly EntryFile[]
}

export type Refusal = {
  readonly day: string
  /** Every reason at once, so one pass over the corpus names every fault rather than the first. */
  readonly refused: readonly string[]
  /** Frontmatter keys this converter declares no turn for. */
  readonly unhandledKeys: readonly string[]
}

export type Outcome = Converted | Refusal

export function refused(outcome: Outcome): outcome is Refusal {
  return "refused" in outcome
}

/**
 * A slug becomes an export name by dropping each `-` and raising what follows.
 *
 * This is `exportedAs` in `akasha/pages-system/page/page-export-name/page-export-name.module.code.ts`,
 * restated rather than imported so this file stays a value-to-value function with no package behind
 * it. The test holds both against each other.
 */
export function exportNameOf(slug: string): string {
  return slug.replace(/-([a-z0-9])/g, (_, one: string) => one.toUpperCase())
}

export function isUuidV7(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(id)
}

const DAY_DATE = /^\d{4}-\d{2}-\d{2}$/

function renderValue(value: unknown, indent: string): string | null {
  if (typeof value === "string") return JSON.stringify(value)
  if (typeof value === "boolean") return value ? "true" : "false"
  if (typeof value === "number") {
    if (!Number.isFinite(value)) return null
    return JSON.stringify(value)
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]"
    const inner: string[] = []
    for (const one of value) {
      const said = renderValue(one, `${indent}  `)
      if (said === null) return null
      inner.push(`${indent}  ${said},`)
    }
    return `[\n${inner.join("\n")}\n${indent}]`
  }
  return null
}

/** The page file's body, as the text that lands. */
export function renderPage(exportName: string, value: JsonObject): string {
  const lines: string[] = [
    `import type { ${DECLARING_TYPE} } from "${DECLARING_IMPORT}"`,
    "",
    `export const ${exportName} = {`,
  ]
  for (const [key, held] of Object.entries(value)) {
    const said = renderValue(held, "  ")
    if (said === null) throw new Error(`${exportName}.${key} holds a value no page file can state`)
    lines.push(`  ${key}: ${said},`)
  }
  lines.push(`} as const satisfies ${DECLARING_TYPE}`, "")
  return lines.join("\n")
}

function entryFile(
  stem: string,
  propertySlug: string,
  rows: readonly SourceRow[],
  idWas: string,
  idIs: string
): EntryFile {
  let repointed = 0
  const lines = rows.map(({ raw, row }) => {
    if (row[DAY_REFERENCE_KEY] !== idWas || idWas === idIs) return raw
    repointed += 1
    return JSON.stringify({ ...row, [DAY_REFERENCE_KEY]: idIs })
  })
  return {
    name: `${stem}.${propertySlug}.${ENTRY_EXTENSION}`,
    text: lines.length === 0 ? "" : `${lines.join("\n")}\n`,
    rows: lines.length,
    repointed,
  }
}

/**
 * The day, converted.
 *
 * `mint` is called once, and only for a day whose identity is not already a uuid v7. Thirty of the
 * 133 days are uuid v5, which akasha does not accept, and re-minting one means re-pointing every
 * session row that names it, which is why the rows and the page are converted in one act.
 */
export function convertDay(source: DaySource, mint: () => string): Outcome {
  const reasons: string[] = []
  const unhandled: string[] = []
  const front = source.frontmatter

  if (!DAY_DATE.test(source.day)) reasons.push(`'${source.day}' is no calendar date`)

  for (const key of Object.keys(front)) {
    if (!DAY_FIELD_BY_KEY.has(key)) unhandled.push(key)
  }

  const rawId = front["id"]
  let idWas = ""
  let idIs = ""
  if (typeof rawId !== "string" || rawId === "") {
    reasons.push("the day states no identity")
  } else {
    idWas = rawId
    idIs = isUuidV7(rawId) ? rawId : mint()
    if (!isUuidV7(idIs)) reasons.push(`the mint answered '${idIs}', which is no uuid version 7`)
  }

  const rawType = front["page-type-slug"]
  if (rawType !== DAY_PAGE_TYPE) {
    reasons.push(`the day names page type '${String(rawType)}' rather than '${DAY_PAGE_TYPE}'`)
  }

  const rawSlug = front["slug"]
  if (rawSlug !== undefined && rawSlug !== source.day) {
    reasons.push(`the day states slug '${String(rawSlug)}' and its file names ${source.day}`)
  }
  const slug = `${SLUG_PREFIX}${source.day}`
  const exportName = exportNameOf(slug)
  if (!/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(exportName)) {
    reasons.push(`slug '${slug}' makes '${exportName}', which is no export name`)
  }

  const value: Record<string, unknown> = {}
  for (const field of DAY_FIELDS) {
    switch (field.turn) {
      case "identity":
        if (idIs !== "") value[field.name] = idIs
        continue
      case "page-type":
        value[field.name] = DAY_PAGE_TYPE
        continue
      case "day-slug":
        value[field.name] = slug
        continue
      case "as-it-stands": {
        const held = front[field.key]
        if (held === undefined) continue
        if (held === null) {
          reasons.push(`'${field.key}' holds nothing, and a page states no empty value`)
          continue
        }
        if (held instanceof Date) {
          reasons.push(
            `'${field.key}' arrived as a Date, so a yaml reader has already read a calendar day ` +
              "as an instant at some midnight and the day it names is a guess"
          )
          continue
        }
        value[field.name] = held
        continue
      }
    }
  }

  for (const field of DAY_FIELDS) {
    if (field.onEveryDay && value[field.name] === undefined) {
      reasons.push(`'${field.key}' is on every day and this day has none`)
    }
  }

  const stem = `${slug}.${DAY_PAGE_TYPE}`
  const entries: EntryFile[] = []
  if (source.sessions.length > 0) {
    value[exportNameOf(SESSIONS_SLUG)] = ENTRY_EXTENSION
    entries.push(entryFile(stem, SESSIONS_SLUG, source.sessions, idWas, idIs))
  }
  if (source.completedTasks.length > 0) {
    value[exportNameOf(COMPLETED_TASKS_SLUG)] = ENTRY_EXTENSION
    entries.push(entryFile(stem, COMPLETED_TASKS_SLUG, source.completedTasks, idWas, idIs))
  }

  for (const row of source.sessions) {
    const held = row.row[DAY_REFERENCE_KEY]
    if (held !== idWas) {
      reasons.push(
        `a session row names day '${String(held)}' and this day's identity is another one`
      )
      break
    }
  }

  if (unhandled.length > 0) {
    reasons.push(`no turn is declared for ${unhandled.map((k) => `'${k}'`).join(", ")}`)
  }
  if (reasons.length > 0) {
    return { day: source.day, refused: reasons, unhandledKeys: unhandled }
  }

  let pageText: string
  try {
    pageText = renderPage(exportName, value)
  } catch (error) {
    return {
      day: source.day,
      refused: [(error as Error).message],
      unhandledKeys: unhandled,
    }
  }

  return {
    day: source.day,
    slug,
    exportName,
    pageName: `${stem}.ts`,
    pageText,
    value,
    idWas,
    idIs,
    reminted: idWas !== idIs,
    entries,
  }
}
