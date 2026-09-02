
import { askComposed } from "@shared/pages-query/ask"
import { requireFirst } from "@akasha/utils-narrow/require-first"
import { type FileTree } from "../../../page/file-tree.ts"
import { diskFileTree } from "../../../page/file-tree.ts"
import { asDeclared, typesFor } from "../page-property-types.ts"
import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import { camelizeKey, kebabizeKey } from "../tracking/keys.ts"
import { asPage, type Json, type Page } from "@akasha/temper-addon-generators/addon-data-page"

export { askComposed, requireFirst }

export interface PageResult {
  readonly rows: readonly Page[]
}

export interface GetPagesArgs {
  readonly pageTypeSlug: string
  readonly limit?: number
  readonly select?: readonly string[]
}

const CARRIED: readonly string[] = ["id", "title", "slug", "icon"]

let tree: FileTree | null = null

const typesHeld = new Map<string, ReadonlyMap<string, string>>()

function typesOf(pageTypeSlug: string): ReadonlyMap<string, string> {
  const held = typesHeld.get(pageTypeSlug)
  if (held !== undefined) return held
  tree ??= diskFileTree(resolveRoots())
  const found = typesFor(tree, pageTypeSlug)
  typesHeld.set(pageTypeSlug, found)
  return found
}

function valueOf(value: unknown, type: string | undefined): Json {
  if (value === undefined || value === null) return null
  if (type === undefined) return value as Json
  if (typeof value === "string") return asDeclared(value, type) as Json
  if (Array.isArray(value) && value.every((one) => typeof one === "string")) {
    return asDeclared(value as readonly string[], type) as Json
  }
  return value as Json
}

function pageOf(
  pageTypeSlug: string,
  types: ReadonlyMap<string, string>,
  values: Readonly<Record<string, unknown>>
): Page {
  const held: Record<string, Json> = { pageTypeSlug }
  for (const [key, value] of Object.entries(values)) {
    held[camelizeKey(key)] = valueOf(value, types.get(key))
  }
  return asPage(held)
}

function keysFor(select: readonly string[] | undefined): readonly string[] | undefined {
  if (select === undefined) return undefined
  const wanted = new Set(CARRIED)
  for (const one of select) wanted.add(kebabizeKey(one))
  return [...wanted]
}

export async function getPages(args: GetPagesArgs): Promise<PageResult> {
  const keys = keysFor(args.select)
  const asked = await askComposed({
    "page-type": args.pageTypeSlug,
    ...(args.limit === undefined ? {} : { limit: args.limit }),
    ...(keys === undefined ? {} : { keys }),
  })
  if (!asked.ok) throw new Error(`\`${args.pageTypeSlug}\` went unread: ${asked.why}`)
  const { n, rows } = asked.answer
  if (rows.length !== n) {
    throw new Error(
      `\`${args.pageTypeSlug}\` answered with ${rows.length} of ${n} page(s), so this is a ` +
        `truncated population rather than the whole one, and nothing may be generated from it`
    )
  }
  const types = typesOf(args.pageTypeSlug)
  return { rows: rows.map((row) => pageOf(args.pageTypeSlug, types, row.values)) }
}
