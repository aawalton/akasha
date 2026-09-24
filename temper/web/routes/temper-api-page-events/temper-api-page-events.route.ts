import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const temperApiPageEvents = {
  id: "01a0d583-dc69-774e-bbc8-be0e1262b405",
  type: "page-type/route",
  slug: "temper-api-page-events",
  definition: "the one stream of page changes a browser opens",
  code: "ts",
  urlPath: "api/page-events",
} as const satisfies Route
