import type { TemperMotifStyle } from "akasha/temper/catalog/temper-gear/temper-motif-styles/temper-motif-style.page-type.types.ts"

export const shardborn = {
  id: "019e5a46-c4c5-786a-8bc5-de893e45d956",
  type: "temper-motif-style",
  slug: "shardborn",
  title: "Shardborn",
  collectionIndex: 110,
  sourceDescription: "Delve/WB dailies (Gold Road)",
  dropSources: ["dlc-delve-dailies", "dlc-world-boss-dailies"],
} as const satisfies TemperMotifStyle
