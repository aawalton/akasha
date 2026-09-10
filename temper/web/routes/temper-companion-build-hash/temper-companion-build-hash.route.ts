import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const temperCompanionBuildHash = {
  id: "01a0829b-744b-77dc-829c-41f6b9a2cce3",
  pageTypeSlug: "route",
  type: "route",
  slug: "temper-companion-build-hash",
  definition: "the companion build a shared hash carries",
  code: "ts",
  urlPath: "companion-build/h/:hash",
} as const satisfies Route
