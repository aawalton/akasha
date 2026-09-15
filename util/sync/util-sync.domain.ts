import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const utilSync = {
  id: "01a05c6a-2bb3-7c64-b97e-cdaaf5e58872",
  type: "domain",
  slug: "util-sync",
  definition: "the day it is in UTC, and the shape a page type's properties are declared in",
  parts: ["module/page-type-props", "module/today"],
} as const satisfies Domain
