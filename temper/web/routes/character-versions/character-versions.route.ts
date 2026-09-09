import type { Route } from "@akasha/code/route"

export const characterVersions = {
  id: "01a08294-823b-79be-8d7a-0731ccd7e110",
  pageTypeSlug: "route",
  type: "route",
  slug: "character-versions",
  definition: "the saved revisions of one character's build",
  code: "ts",
  urlPath: "api/character-versions/:buildId",
} as const satisfies Route
