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
import { camelizeKey } from "akasha/page/naming/folding/modules/camelize-key/camelize-key.module.code.ts"

export const DECLARATION = "type-declaration"

export const AMBIENT_KEY = "d"

export const AMBIENT_KIND = "ts"

const DOMAIN = "domain"

const PARTS = "parts"

const GENERATED = "generated"

const WRITTEN_BY = "writtenBy"

const SLUG = "slug"

const TYPES = "akasha/code/type-declaration/type-declaration.page-type.types.ts"

export type Paged = {
  readonly slug: string
  readonly at: string
  readonly beside: string
  readonly body: string
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
    found.push({ slug, at: listed.path, beside, body })
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
  const stamp = `{ ${WRITTEN_BY}: "${writer}", sourceVersion: ${String(sourceVersion)} }`
  return `${[
    `import type { TypeDeclaration } from "${TYPES}"`,
    "",
    `export const ${camelizeKey(slug)} = {`,
    `  type: "page-type/${DECLARATION}",`,
    `  ${SLUG}: "${slug}",`,
    `  definition: "${definition}",`,
    `  ${AMBIENT_KEY}: "${AMBIENT_KIND}",`,
    `  ${GENERATED}: ${stamp},`,
    "} as const satisfies TypeDeclaration",
  ].join("\n")}\n`
}
