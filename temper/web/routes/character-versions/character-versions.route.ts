import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const characterVersions = {
  id: "01a08294-823b-79be-8d7a-0731ccd7e110",
  type: "page-type/route",
  slug: "character-versions",
  definition: "the saved revisions of a character's build",
  code: "ts",
  urlPath: "api/character-versions/:buildSlug",
} as const satisfies Route
