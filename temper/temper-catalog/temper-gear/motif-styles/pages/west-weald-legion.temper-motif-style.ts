import type { TemperMotifStyle } from "../temper-motif-style.page-type.ts"

export const westWealdLegion = {
  id: "019e5a46-c4c8-76ef-b6f8-3354743aca60",
  pageTypeSlug: "temper-motif-style",
  slug: "west-weald-legion",
  title: "West Weald Legion",
  collectionIndex: 111,
  sourceDescription: "Mirrormoor Incursion dailies (Gold Road)",
  dropSources: ["dlc-delve-dailies", "dlc-world-boss-dailies", "dlc-incursion-dailies"],
} as const satisfies TemperMotifStyle
