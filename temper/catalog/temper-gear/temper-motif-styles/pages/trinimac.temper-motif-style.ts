import type { TemperMotifStyle } from "akasha/temper/catalog/temper-gear/temper-motif-styles/temper-motif-style.page-type.types.ts"

export const trinimac = {
  id: "019e5a46-c3b8-7505-aeb9-66bc38b0d942",
  type: "temper-motif-style",
  slug: "trinimac",
  title: "Trinimac",
  collectionIndex: 11,
  sourceDescription: "Delve dailies from Guruzug (Orsinium)",
  dropSources: ["dlc-delve-dailies", "dlc-world-boss-dailies"],
} as const satisfies TemperMotifStyle
