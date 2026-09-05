import type { Route } from "@akasha/code-system/route"

export const addonBundleVersion = {
  id: "01a072e1-dbd7-744e-a9b5-617a62ed3cbe",
  pageTypeSlug: "route",
  slug: "addon-bundle-version",
  definition: "the build the addon bundle now offered was packed from",
  code: "ts",
  test: "ts",
  urlPath: "api/addons/version",
} as const satisfies Route
