import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const addonBundle = {
  id: "01a072e1-dbd6-7bad-a769-27527ac87d4f",
  type: "page-type/route",
  slug: "addon-bundle",
  definition: "the zip archive with every distributable addon",
  code: "ts",
  test: "ts",
  urlPath: "api/addons/download",
  createdAt: "2026-09-05T18:43:19.638Z",
  updatedAt: "2026-09-15T16:44:30.000Z",
} as const satisfies Route
