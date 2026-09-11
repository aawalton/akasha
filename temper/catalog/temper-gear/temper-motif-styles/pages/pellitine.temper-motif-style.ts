import type { TemperMotifStyle } from "akasha/temper/catalog/temper-gear/temper-motif-styles/temper-motif-style.page-type.types.ts"

export const pellitine = {
  id: "019e5a46-c42f-7e7b-b4fb-ce8005b5c97c",
  type: "temper-motif-style",
  slug: "pellitine",
  title: "Pellitine",
  collectionIndex: 60,
  sourceDescription: "Dragon Hunt dailies (Northern Elsweyr)",
  dropSources: ["dlc-delve-dailies", "dlc-world-boss-dailies", "dlc-incursion-dailies"],
} as const satisfies TemperMotifStyle
