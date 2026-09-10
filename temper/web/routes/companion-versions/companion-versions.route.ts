import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const companionVersions = {
  id: "01a08294-ce76-7540-86fe-0dddd869093b",
  pageTypeSlug: "route",
  type: "route",
  slug: "companion-versions",
  definition: "the saved revisions of one companion's build",
  code: "ts",
  urlPath: "api/companion-versions/:buildId",
} as const satisfies Route
