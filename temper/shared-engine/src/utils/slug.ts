import { buildPageHref, PageTypeSlug } from "@shared/pages-url"
import type { BuildId } from "@temper/shared-formula-framework/branded"

const CHARACTER_SLUG = PageTypeSlug("character-build")
const COMPANION_SLUG = PageTypeSlug("companion-build")

export function characterUrl(buildId: BuildId, name?: string): string {
  return buildPageHref({
    pageTypeSlug: CHARACTER_SLUG,
    slug: null,
    fallbackSlugSource: name,
    id: buildId,
  })
}

export function companionUrl(buildId: BuildId, name?: string): string {
  return buildPageHref({
    pageTypeSlug: COMPANION_SLUG,
    slug: null,
    fallbackSlugSource: name,
    id: buildId,
  })
}
