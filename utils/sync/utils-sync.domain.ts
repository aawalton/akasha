import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const utilsSync = {
  id: "01a05c6a-2bb3-7c64-b97e-cdaaf5e58872",
  type: "domain",
  slug: "utils-sync",
  definition: "the day it is in UTC, and the shape a page type's properties are declared in",
  parts: ["module/page-type-props", "module/today"],
} as const satisfies Domain
