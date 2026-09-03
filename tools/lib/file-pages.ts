import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import type { Row } from "@akasha/pages-system/page-derive-shape"
import { UNREACHED } from "@akasha/pages-system/page-query-shape"
import { textOf } from "@akasha/pages-system/page-query-values"
import { answer } from "./page-query.ts"

export class PagesUnread extends Error {
  readonly pageType: string
  readonly why: string
  constructor(pageType: string, why: string) {
    super(
      `the \`${pageType}\` pages went unread, so no page can be called present or missing: ${why}`
    )
    this.name = "PagesUnread"
    this.pageType = pageType
    this.why = why
  }
}

export class PagesMissing extends Error {
  readonly pageType: string
  readonly slugs: readonly string[]
  constructor(pageType: string, slugs: readonly string[]) {
    super(
      slugs.length === 0
        ? `no \`${pageType}\` page stands, so nothing was there to read`
        : `no \`${pageType}\` page for slug(s): ${slugs.join(", ")}`
    )
    this.name = "PagesMissing"
    this.pageType = pageType
    this.slugs = slugs
  }
}

function withSlug(keys: readonly string[]): readonly string[] {
  return keys.includes("slug") ? keys : ["slug", ...keys]
}

export function readFilePages(pageType: string, keys: readonly string[]): readonly Row[] {
  const found = answer(resolveRoots(), { pageType, keys: withSlug(keys) })
  if (found === null) throw new PagesUnread(pageType, UNREACHED)
  if (found.rows.length === 0) throw new PagesMissing(pageType, [])
  return found.rows
}

export function readFilePageBySlug(pageType: string, slug: string, keys: readonly string[]): Row {
  const found = readFilePages(pageType, keys).find((row) => textOf(row.values, "slug") === slug)
  if (found === undefined) throw new PagesMissing(pageType, [slug])
  return found
}
