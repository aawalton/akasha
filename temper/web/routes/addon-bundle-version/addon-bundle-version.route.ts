import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const addonBundleVersion = {
  id: "01a072e1-dbd7-744e-a9b5-617a62ed3cbe",
  type: "page-type/route",
  slug: "addon-bundle-version",
  definition: "the build of the addon bundle now offered",
  code: "ts",
  test: "ts",
  urlPath: "api/addons/version",
} as const satisfies Route
