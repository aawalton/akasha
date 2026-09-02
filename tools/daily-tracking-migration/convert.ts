/**
 * One tracked day in markdown becomes one akasha page and the two files beside it.
 *
 * Everything here is a function from a value to a value. Nothing reads a file, writes one, or mints
 * an identity of its own — the mint is handed in — so the whole conversion can be proved against
 * copies in /tmp without the corpus being touched.
 */

import { camelizeKey } from "../lib/tracking/keys.ts"
import { type Placing, importFor, pageAtIn } from "./placing.ts"
import {
  COMPLETED_TASKS_SLUG,
  DAY_FIELD_BY_KEY,
  DAY_FIELDS,
  DAY_PAGE_TYPE,
  DAY_REFERENCE_KEY,
  DECLARING_TYPE,
  ENTRY_EXTENSION,
  SESSIONS_SLUG,
  SLUG_PREFIX,
} from "./shape.ts"

export type JsonObject = Readonly<Record<string, unknown>>

export type DaySource = {
  /** The date the file name carries, `2026-03-05`. */
  readonly day: string
  readonly frontmatter: JsonObject
  readonly sessions: readonly JsonObject[]
  readonly completedTasks: readonly JsonObject[]
}

/** The key a row beside an akasha page carries its day reference under. */
export const DAY_REFERENCE_NAME = camelizeKey(DAY_REFERENCE_KEY)

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
  /** Where that file belongs, against the repository root, which is akasha's own answer. */
  readonly pageAt: string
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

/**
 * How many hex of an identity a page's URL is reached by.
 *
 * `ID_SUFFIX_LENGTH` in `akasha/pages-system/pages-url/page-href/page-href.module.code.ts`,
 * restated here for the reason `exportNameOf` restates its own rule, and held against akasha's by
 * the test.
 */
export const ID_SUFFIX_LENGTH = 8

/**
 * A minted identity re-tailed with the last eight hex of the identity it replaces.
 *
 * A day page is reached at `<slug>-<id.slice(-8)>`, and the route resolves that suffix alone:
 * `getPageByIdSuffix` asks `id ends-with <suffix>` and reads no slug where one page matches. So a
 * day whose identity is replaced loses every saved link to it unless the replacement ends the same
 * way. Keeping the tail is what makes all 133 days keep their URL rather than 103 of them.
 *
 * The tail is free to carry. `uuidVersion7` fills bytes 0 to 5 with the millisecond, sets the
 * version in byte 6 and the variant in byte 8, and leaves bytes 12 to 15 — exactly these eight hex —
 * random and meaning nothing. Writing the old tail over them leaves a uuid version 7 that
 * `akasha/checks/code-checks/pages/id-is-a-uuid-version-7` accepts, and leaves the URL resolving.
 *
 * Carrying the old identity whole was the other way to keep the URL, and that check refuses it: a
 * version 5 in a `.ts` file fails on patch, worktree, deploy and audit. It would trade thirty broken
 * links for thirty pages that never land.
 *
 * A tail that is not eight lower hex answers a value `isUuidV7` refuses, which is how the caller
 * refuses the day rather than landing an identity no check would take.
 */
export function withSuffixOf(minted: string, was: string): string {
  return `${minted.slice(0, -ID_SUFFIX_LENGTH)}${was.slice(-ID_SUFFIX_LENGTH)}`
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
export function renderPage(exportName: string, value: JsonObject, importFrom: string): string {
  const lines: string[] = [
    `import type { ${DECLARING_TYPE} } from "${importFrom}"`,
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

/**
 * One row as akasha reads one, which is camel-keyed.
 *
 * `akasha write` judges a row against the fields its entry property declares, and a property is
 * reached by its slug and read by that slug written in camel — `property-slug.text-property.ts:29`.
 * So `start-time` in the markdown sidecar is `startTime` beside a day page, and a row keyed the
 * markdown way is refused outright. `camelizeKey` is the same call `camelisedRow` in
 * `tools/lib/tracking/akasha-day.ts` makes for every row Alan's tracking writes after the move, so
 * the migrated rows and the appended ones are keyed by one rule.
 */
export function camelisedRow(row: JsonObject): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [key, held] of Object.entries(row)) out[camelizeKey(key)] = held
  return out
}

function entryFile(
  stem: string,
  propertySlug: string,
  rows: readonly JsonObject[],
  idWas: string,
  idIs: string
): EntryFile {
  let repointed = 0
  const lines = rows.map((row) => {
    const turned = camelisedRow(row)
    if (turned[DAY_REFERENCE_NAME] === idWas && idWas !== idIs) {
      repointed += 1
      turned[DAY_REFERENCE_NAME] = idIs
    }
    return JSON.stringify(turned)
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
 *
 * What the mint answers is re-tailed by `withSuffixOf` with the last eight hex of the identity it
 * replaces, so a re-minted day is reached at the URL it was reached at before the move.
 *
 * `placing` is where akasha would put a day page and where the type it satisfies is declared. The
 * import the rendered file states is computed from those two rather than written down, so a page
 * rendered for one depth can never be read as one rendered for another.
 */
export function convertDay(source: DaySource, mint: () => string, placing: Placing): Outcome {
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
    idIs = isUuidV7(rawId) ? rawId : withSuffixOf(mint(), rawId)
    if (!isUuidV7(idIs)) {
      reasons.push(`'${rawId}' re-minted to '${idIs}', which is no uuid version 7`)
    }
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
    const held = row[DAY_REFERENCE_KEY]
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

  const pageName = `${stem}.ts`
  let pageText: string
  try {
    pageText = renderPage(exportName, value, importFor(placing, pageName))
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
    pageName,
    pageAt: pageAtIn(placing, pageName),
    pageText,
    value,
    idWas,
    idIs,
    reminted: idWas !== idIs,
    entries,
  }
}
