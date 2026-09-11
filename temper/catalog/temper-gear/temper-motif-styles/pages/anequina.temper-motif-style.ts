import type { TemperMotifStyle } from "akasha/temper/catalog/temper-gear/temper-motif-styles/temper-motif-style.page-type.types.ts"

export const anequina = {
  id: "019e5a46-c42d-738c-8b4f-d8040ad1285a",
  type: "temper-motif-style",
  slug: "anequina",
  title: "Anequina",
  collectionIndex: 59,
  sourceDescription: "World Boss/Delve dailies (Northern Elsweyr)",
  dropSources: ["dlc-delve-dailies", "dlc-world-boss-dailies", "dlc-incursion-dailies"],
} as const satisfies TemperMotifStyle
