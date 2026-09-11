import type { Route } from "akasha/code/routes/route.page-type.types.ts"

export const addonBundle = {
  id: "01a072e1-dbd6-7bad-a769-27527ac87d4f",
  type: "route",
  slug: "addon-bundle",
  definition: "the zip archive with every distributable addon",
  code: "ts",
  test: "ts",
  urlPath: "api/addons/download",
} as const satisfies Route
