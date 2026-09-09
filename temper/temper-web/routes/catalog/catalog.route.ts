import type { Route } from "@akasha/code/route"

export const catalog = {
  id: "01a082ff-607a-72a4-9f87-7ddebe068f34",
  pageTypeSlug: "route",
  type: "route",
  slug: "catalog",
  definition: "the game's reference data, read on a screen",
  code: "tsx",
  urlPath: "catalog",
} as const satisfies Route
