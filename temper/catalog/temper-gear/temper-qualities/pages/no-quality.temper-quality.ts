import type { TemperQuality } from "akasha/temper/catalog/temper-gear/temper-qualities/temper-quality.page-type.types.ts"

export const noQuality = {
  id: "019e2fc4-de0e-7488-a429-384e5d0630eb",
  type: "temper-quality",
  slug: "no-quality",
  title: "No Quality",
  key: "no-quality",
  displayOrder: 0,
  available: true,
} as const satisfies TemperQuality
