import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const temperApiNavIcon = {
  id: "01a0829a-8f37-7fcf-ad6f-bd2a5be6def4",
  pageTypeSlug: "route",
  type: "route",
  slug: "temper-api-nav-icon",
  definition: "the icon drawn for a nav entry",
  code: "ts",
  urlPath: "api/nav-icon/:idSuffix",
} as const satisfies Route
