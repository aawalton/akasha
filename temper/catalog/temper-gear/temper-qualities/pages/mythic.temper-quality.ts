import type { TemperQuality } from "akasha/temper/catalog/temper-gear/temper-qualities/temper-quality.page-type.types.ts"

export const mythic = {
  id: "019e2fc4-de1e-725f-99b3-94c57a242948",
  type: "temper-quality",
  slug: "mythic",
  title: "Mythic",
  key: "mythic",
  displayOrder: 6,
  available: false,
} as const satisfies TemperQuality
