export type BuildPageTypeSlug = "character-build" | "companion-build"

export type BuildVersionPageTypeSlug = "character-build-version" | "companion-build-version"

const VERSION_PAGE_TYPE_OF = {
  "character-build": "character-build-version",
  "companion-build": "companion-build-version",
} as const satisfies Record<BuildPageTypeSlug, BuildVersionPageTypeSlug>

export function buildVersionPageTypeOf(
  buildPageTypeSlug: BuildPageTypeSlug
): BuildVersionPageTypeSlug {
  return VERSION_PAGE_TYPE_OF[buildPageTypeSlug]
}

export function buildAddressOf(buildPageTypeSlug: BuildPageTypeSlug, buildSlug: string): string {
  return `${buildPageTypeSlug}/${buildSlug}`
}
