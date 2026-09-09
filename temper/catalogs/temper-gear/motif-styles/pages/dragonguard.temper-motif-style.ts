import type { TemperMotifStyle } from "../temper-motif-style.page-type.ts"

export const dragonguard = {
  id: "019e5a46-c435-7d61-bc07-42819a4a8e63",
  pageTypeSlug: "temper-motif-style",
  slug: "dragonguard",
  title: "Dragonguard",
  collectionIndex: 62,
  sourceDescription: "Dragon hunt/Delve dailies (Southern Elsweyr)",
  dropSources: ["dlc-delve-dailies", "dlc-world-boss-dailies", "dlc-incursion-dailies"],
} as const satisfies TemperMotifStyle
