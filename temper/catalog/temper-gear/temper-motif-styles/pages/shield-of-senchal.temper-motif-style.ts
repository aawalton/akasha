import type { TemperMotifStyle } from "akasha/temper/catalog/temper-gear/temper-motif-styles/temper-motif-style.page-type.types.ts"

export const shieldOfSenchal = {
  id: "019e5a46-c441-72e8-9c91-d0653df36b69",
  type: "temper-motif-style",
  slug: "shield-of-senchal",
  title: "Shield of Senchal",
  collectionIndex: 66,
  sourceDescription: "Dailies in Senchal (Southern Elsweyr)",
  dropSources: ["dlc-delve-dailies", "dlc-world-boss-dailies"],
} as const satisfies TemperMotifStyle
