import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const addonBundleVersion = {
  id: "01a072e1-dbd7-744e-a9b5-617a62ed3cbe",
  type: "page-type/route",
  slug: "addon-bundle-version",
  definition: "the build of the addon bundle now offered",
  code: "ts",
  test: "ts",
  urlPath: "api/addons/version",
  createdAt: "2026-09-05T18:43:19.639Z",
  updatedAt: "2026-09-22T13:43:34.000Z",
} as const satisfies Route
