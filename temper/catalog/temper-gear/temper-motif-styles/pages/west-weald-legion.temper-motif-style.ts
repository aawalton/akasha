import type { TemperMotifStyle } from "akasha/temper/catalog/temper-gear/temper-motif-styles/temper-motif-style.page-type.types.ts"

export const westWealdLegion = {
  id: "019e5a46-c4c8-76ef-b6f8-3354743aca60",
  type: "temper-motif-style",
  slug: "west-weald-legion",
  title: "West Weald Legion",
  collectionIndex: 111,
  sourceDescription: "Mirrormoor Incursion dailies (Gold Road)",
  dropSources: ["dlc-delve-dailies", "dlc-world-boss-dailies", "dlc-incursion-dailies"],
} as const satisfies TemperMotifStyle
