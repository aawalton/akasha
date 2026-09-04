import type { TemperMotifStyle } from "../temper-motif-style.page-type.ts"

export const firesong = {
  id: "019e5a46-c4aa-77ed-98d5-24d3daa03b44",
  pageTypeSlug: "temper-motif-style",
  slug: "firesong",
  title: "Firesong",
  collectionIndex: 101,
  sourceDescription: "Volcanic Vent/dailies (Galen)",
  dropSources: ["dlc-delve-dailies", "dlc-world-boss-dailies", "dlc-incursion-dailies"],
} as const satisfies TemperMotifStyle
