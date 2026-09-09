import type { Route } from "@akasha/code/route"

export const apiItems = {
  id: "01a082a3-c4c1-7526-a0b1-9bd8deeca3be",
  pageTypeSlug: "route",
  type: "route",
  slug: "api-items",
  definition: "the mined items a browser names by id",
  code: "ts",
  urlPath: "api/items",
} as const satisfies Route
