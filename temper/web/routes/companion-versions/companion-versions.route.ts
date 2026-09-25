import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const companionVersions = {
  id: "01a08294-ce76-7540-86fe-0dddd869093b",
  type: "page-type/route",
  slug: "companion-versions",
  definition: "the saved revisions of a companion's build",
  code: "ts",
  urlPath: "api/companion-versions/:buildSlug",
} as const satisfies Route
