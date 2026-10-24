import { asRecord } from "akasha/code/type/narrowing/modules/as-record/as-record.module.code.ts"
import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { upsertPage } from "akasha/page/access/modules/upsert/upsert.module.code.ts"
import { slugOf } from "akasha/page/naming/folding/modules/slug-of/slug-of.module.code.ts"
import {
  readFiles,
  readPages,
  writeFiles,
} from "akasha/page/query/modules/store-writing/store-writing.module.code.ts"
import type { CompletionPageUpsert } from "akasha/temper/watcher/modules/watcher-completion-landing/watcher-completion-landing.module.code.ts"
import type { CompletionPageRead } from "akasha/temper/watcher/modules/watcher-import-completion/watcher-import-completion.module.code.ts"
import { log } from "akasha/temper/watcher/modules/watcher-logging/watcher-logging.module.code.ts"
import {
  besidePathsFor,
  contentIn,
  jsonlLinesOf,
  PAGE_LANDING_WRITER,
  type ReadFiles,
  type ReadPages,
  type WriteFiles,
} from "akasha/temper/watcher/modules/watcher-page-landing/watcher-page-landing.module.code.ts"

const CHARACTER_PAGE_TYPE_SLUG = "temper-account-character"

const MARKS = /\p{M}/gu

function characterSlugOf(name: string): string {
  return slugOf(name.normalize("NFD").replace(MARKS, ""))
}

export function bySlugOf<T>(
  items: readonly T[],
  nameOf: (item: T) => string
): ReadonlyMap<string, readonly T[]> {
  const bySlug = new Map<string, T[]>()
  for (const item of items) {
    const slug = characterSlugOf(nameOf(item))
    const held = bySlug.get(slug)
    if (held === undefined) bySlug.set(slug, [item])
    else held.push(item)
  }
  return bySlug
}

const LINES_ENDING = "jsonl"

const CHARACTER_ROW_LIMIT = 1000

export interface LinesLandingDeps {
  readonly read?: CompletionPageRead
  readonly upsert?: CompletionPageUpsert
  readonly readPages?: ReadPages
  readonly readFiles?: ReadFiles
  readonly writeFiles?: WriteFiles
  readonly report?: (message: string) => void
}

export interface LinesLanded {
  readonly landed: number
  readonly unplaced: readonly string[]
}

type LinesWith<T> = (
  held: string | null,
  items: readonly T[],
  besideHeld: string | null
) => string | null

type LinesKind<T> = {
  readonly property: string
  readonly what: string
  readonly left: string
  readonly linesWith: LinesWith<T>
  readonly beside?: string
}

function unplacedWhy(slug: string, left: string): string {
  return `no ${CHARACTER_PAGE_TYPE_SLUG} page is named ${slug}, so ${left}`
}

export async function characterLinesLanded<T>(
  bySlug: ReadonlyMap<string, readonly T[]>,
  kind: LinesKind<T>,
  deps: LinesLandingDeps = {}
): Promise<LinesLanded> {
  const report = deps.report ?? log
  if (bySlug.size === 0) return { landed: 0, unplaced: [] }
  const rows = await (deps.read ?? getPages)({
    pageTypeSlug: CHARACTER_PAGE_TYPE_SLUG,
    select: ["slug"],
    limit: CHARACTER_ROW_LIMIT,
  })
  const known = new Set(rows.rows.map((row) => asRecord(row)?.slug))
  const slugs = [...bySlug.keys()].filter((slug) => known.has(slug))
  const unplaced = [...bySlug.keys()].filter((slug) => !known.has(slug))
  for (const slug of unplaced) report(unplacedWhy(slug, kind.left))
  if (slugs.length === 0) return { landed: 0, unplaced }

  const beside = await besidePathsFor(
    deps.readPages ?? readPages,
    CHARACTER_PAGE_TYPE_SLUG,
    slugs,
    kind.property,
    LINES_ENDING
  )
  const alongside =
    kind.beside === undefined
      ? new Map<string, string>()
      : await besidePathsFor(
          deps.readPages ?? readPages,
          CHARACTER_PAGE_TYPE_SLUG,
          slugs,
          kind.beside,
          LINES_ENDING
        )
  const found = await (deps.readFiles ?? readFiles)([...beside.values(), ...alongside.values()])
  if (!found.ok) throw new Error(`the ${kind.property} files went unread: ${found.why}`)

  const puts: { path: string; content: string }[] = []
  const unnamed: string[] = []
  let landed = 0
  for (const slug of slugs) {
    const path = beside.get(slug) ?? ""
    const held = contentIn(found.bodies, path)
    const besideAt = alongside.get(slug)
    const besideHeld = besideAt === undefined ? null : contentIn(found.bodies, besideAt)
    const written = kind.linesWith(held, bySlug.get(slug) ?? [], besideHeld)
    if (written === null) continue
    const had = new Set(jsonlLinesOf(held))
    landed = landed + jsonlLinesOf(written).filter((line) => !had.has(line)).length
    puts.push({ path, content: written })
    if (held === null) unnamed.push(slug)
  }
  if (puts.length > 0) {
    const wrote = await (deps.writeFiles ?? writeFiles)(
      puts,
      PAGE_LANDING_WRITER,
      `temper: ${landed} ${kind.what}(s) for ${puts.length} character(s)`,
      undefined,
      undefined,
      found.at
    )
    if (!wrote.ok) throw new Error(`the ${kind.property} did not land: ${wrote.why}`)
  }
  for (const slug of unnamed) {
    await (deps.upsert ?? upsertPage)({
      pageTypeSlug: CHARACTER_PAGE_TYPE_SLUG,
      where: [{ key: "slug", eq: slug }],
      set: { [kind.property]: LINES_ENDING },
      select: ["id"],
    })
  }
  report(`landed ${landed} ${kind.what}(s)`)
  return { landed, unplaced }
}
