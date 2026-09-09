import type { Domain } from "../../domains/domain.page-type.ts"

export const utilsSync = {
  id: "01a05c6a-2bb3-7c64-b97e-cdaaf5e58872",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "utils-sync",
  definition: "the day it is in UTC, and the shape a page type's properties are declared in",
  parts: ["module/today", "module/page-type-props"],
} as const satisfies Domain
