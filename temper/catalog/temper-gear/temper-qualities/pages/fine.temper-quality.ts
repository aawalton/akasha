import type { TemperQuality } from "akasha/temper/catalog/temper-gear/temper-qualities/temper-quality.page-type.types.ts"

export const fine = {
  id: "019e2fc4-de14-71ef-b544-07071b91af02",
  type: "temper-quality",
  slug: "fine",
  title: "Fine",
  key: "fine",
  displayOrder: 2,
  available: true,
} as const satisfies TemperQuality
