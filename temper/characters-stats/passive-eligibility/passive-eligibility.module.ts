import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const passiveEligibility = {
  id: "01a06271-abcf-77bf-921a-989075ce70f0",
  pageTypeSlug: "module",
  slug: "passive-eligibility",
  definition: "whether a build reaches a passive's skill line, ruled per bar",
  code: "ts",
} as const satisfies Module
