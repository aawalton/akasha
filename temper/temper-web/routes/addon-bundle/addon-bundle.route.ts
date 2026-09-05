import type { Route } from "@akasha/code-system/route"

export const addonBundle = {
  id: "01a072e1-dbd6-7bad-a769-27527ac87d4f",
  pageTypeSlug: "route",
  slug: "addon-bundle",
  definition: "the zip archive holding every distributable addon",
  code: "tsx",
  test: "tsx",
  urlPath: "api/addons/download",
} as const satisfies Route
