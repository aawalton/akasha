import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"
import {
  recordsIn,
  textAt,
  textsAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { foldedInLowerCamelCase } from "akasha/page/name-format/pages/lower-camel-case/lower-camel-case.name-format.code.ts"
import { z } from "zod"

export const DECLARATION = "type-declaration"

export const AMBIENT_KEY = "d"

export const AMBIENT_KIND = "ts"

const DOMAIN = "domain"

const PARTS = "parts"

const GENERATED = "generated"

const WRITTEN_BY = "writtenBy"

const SLUG = "slug"

const SOURCE_VERSION = "sourceVersion"

const TYPES = "akasha/code/type-declaration/type-declaration.page-type.types.ts"

const STAMP = /^([ \t]*)generated: (\{[^}]*\})(,?)$/m

const STAMP_SAID = z.tuple([z.string(), z.string(), z.string(), z.string()])

export type Paged = {
  readonly slug: string
  readonly at: string
  readonly beside: string
  readonly body: string
  readonly page: string
}

export type Restating = {
  readonly old: string
  readonly new: string
}

function stampLine(space: string, writer: string, sourceVersion: number, comma: string): string {
  const held = `{ ${WRITTEN_BY}: "${writer}", ${SOURCE_VERSION}: ${String(sourceVersion)} }`
  return `${space}${GENERATED}: ${held}${comma}`
}

export function stampRestated(
  page: string,
  writer: string,
  sourceVersion: number
): Restating | null {
  const found = STAMP_SAID.safeParse(STAMP.exec(page))
  if (!found.success) return null
  const [was, space, , comma] = found.data
  const now = stampLine(space, writer, sourceVersion, comma)
  return was === now ? null : { old: was, new: now }
}

export function writtenBy(value: Value, writer: string): boolean {
  for (const one of recordsIn(value[GENERATED])) {
    if (textAt(one, WRITTEN_BY) === writer) return true
  }
  return false
}

export function pagesWrittenBy(root: string, writer: string): readonly Paged[] {
  const shadow = shadowAt(root)
  const found: Paged[] = []
  for (const listed of shadow.index.everyOfType(DECLARATION)) {
    const value = shadow.index.pageByPath(listed.path)
    if (value === null || !writtenBy(value, writer)) continue
    const beside = besideAt(listed.path, AMBIENT_KEY, AMBIENT_KIND)
    const slug = textAt(value, SLUG)
    if (beside === null || slug === null) continue
    let body = ""
    try {
      body = readFileSync(resolve(root, beside), "utf8")
    } catch {}
    let held = ""
    try {
      held = readFileSync(resolve(root, listed.path), "utf8")
    } catch {}
    found.push({ slug, at: listed.path, beside, body, page: held })
  }
  return [...found].sort((one, other) => one.slug.localeCompare(other.slug))
}

export function namingOf(root: string, slug: string): string | null {
  const shadow = shadowAt(root)
  const wanted = `${DECLARATION}/${slug}`
  for (const listed of shadow.index.everyOfType(DOMAIN)) {
    const value = shadow.index.pageByPath(listed.path)
    if (value === null) continue
    if (textsAt(value, PARTS)?.includes(wanted) === true) return listed.path
  }
  return null
}

export function pageBodyFor(
  slug: string,
  definition: string,
  writer: string,
  sourceVersion: number
): string {
  return `${[
    `import type { TypeDeclaration } from "${TYPES}"`,
    "",
    `export const ${foldedInLowerCamelCase(slug)} = {`,
    `  type: "page-type/${DECLARATION}",`,
    `  ${SLUG}: "${slug}",`,
    `  definition: "${definition}",`,
    `  ${AMBIENT_KEY}: "${AMBIENT_KIND}",`,
    stampLine("  ", writer, sourceVersion, ","),
    "} as const satisfies TypeDeclaration",
  ].join("\n")}\n`
}
