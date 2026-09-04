import type { TemperMotifStyle } from "../temper-motif-style.page-type.ts"

export const deadWater = {
  id: "019e5a46-c422-70ff-b950-b612bc55960a",
  pageTypeSlug: "temper-motif-style",
  slug: "dead-water",
  title: "Dead-Water",
  collectionIndex: 55,
  sourceDescription: "Dailies (Murkmire)",
  dropSources: ["dlc-delve-dailies", "dlc-world-boss-dailies"],
} as const satisfies TemperMotifStyle
