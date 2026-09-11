import type { TemperMotifStyle } from "akasha/temper/catalog/temper-gear/temper-motif-styles/temper-motif-style.page-type.types.ts"

export const malacath = {
  id: "019e5a46-c3ba-7f3f-ba5a-bccc0bee726e",
  type: "temper-motif-style",
  slug: "malacath",
  title: "Malacath",
  collectionIndex: 12,
  sourceDescription: "World Boss dailies from Arzorag (Orsinium)",
  dropSources: ["dlc-delve-dailies", "dlc-world-boss-dailies"],
} as const satisfies TemperMotifStyle
