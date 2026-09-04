import type { TemperMotifStyle } from "../temper-motif-style.page-type.ts"

export const greymoor = {
  id: "019e5a46-c44d-734a-ae2f-108d0591d598",
  pageTypeSlug: "temper-motif-style",
  slug: "greymoor",
  title: "Greymoor",
  collectionIndex: 70,
  sourceDescription: "Harrowstorm dailies (Western Skyrim)",
  dropSources: ["dlc-delve-dailies", "dlc-world-boss-dailies", "dlc-incursion-dailies"],
} as const satisfies TemperMotifStyle
