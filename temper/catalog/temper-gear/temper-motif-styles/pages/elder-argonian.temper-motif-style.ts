import type { TemperMotifStyle } from "akasha/temper/catalog/temper-gear/temper-motif-styles/temper-motif-style.page-type.types.ts"

export const elderArgonian = {
  id: "019e5a46-c424-7b51-a65e-ce8306f57651",
  type: "temper-motif-style",
  slug: "elder-argonian",
  title: "Elder Argonian",
  collectionIndex: 56,
  sourceDescription: "Dailies (Murkmire)",
  dropSources: ["dlc-delve-dailies", "dlc-world-boss-dailies"],
} as const satisfies TemperMotifStyle
