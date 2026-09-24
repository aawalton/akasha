import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const temperApiPageFollow = {
  id: "01a0d583-dc69-7960-ab3f-b8b2c8d0d712",
  type: "page-type/route",
  slug: "temper-api-page-follow",
  definition: "the pages and lists a browser's stream follows",
  code: "ts",
  urlPath: "api/page-follow",
} as const satisfies Route
