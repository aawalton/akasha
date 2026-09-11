import type { TemperAlliance } from "akasha/temper/catalog/temper-world/temper-alliances/temper-alliance.page-type.types.ts"

export const daggerfallCovenant = {
  id: "01a05fc5-168d-7f14-a361-d6f96372672d",
  pageTypeSlug: "temper-alliance",
  type: "temper-alliance",
  slug: "daggerfall-covenant",
  title: "Daggerfall Covenant",
  esoAllianceId: 3,
} as const satisfies TemperAlliance
