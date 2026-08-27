
const ID_SUFFIX_LENGTH = 8

const FALLBACK_SLUG = "untitled"

export type PageTypeSlug = string & { readonly __brand: "PageTypeSlug" }

export function PageTypeSlug(value: string): PageTypeSlug {
  return value as PageTypeSlug
}

export type PageHrefArgs = {
  pageTypeSlug: PageTypeSlug
  slug: string | null | undefined
  fallbackSlugSource: string | null | undefined
  id: string
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function resolveSlug(
  slug: string | null | undefined,
  fallbackSlugSource: string | null | undefined
): string {
  if (typeof slug === "string" && slug.length > 0) return slug
  const source = typeof fallbackSlugSource === "string" ? fallbackSlugSource : ""
  const slugified = slugify(source)
  return slugified !== "" ? slugified : FALLBACK_SLUG
}

function buildPageHrefParam(args: PageHrefArgs): string {
  const slug = resolveSlug(args.slug, args.fallbackSlugSource)
  const idSuffix = args.id.slice(-ID_SUFFIX_LENGTH)
  return `${slug}-${idSuffix}`
}

export function buildPageHref(args: PageHrefArgs): string {
  return `/${args.pageTypeSlug}/${buildPageHrefParam(args)}`
}
