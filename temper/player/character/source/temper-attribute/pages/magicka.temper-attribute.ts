import type { TemperAttribute } from "akasha/temper/player/character/source/temper-attribute/temper-attribute.page-type.types.ts"

export const magicka = {
  id: "01a0e057-42d1-7347-89a7-0153e02b3904",
  type: "page-type/temper-attribute",
  slug: "magicka",
  title: "Maximum Magicka",
  metric: "temper-metric/magicka-maximum",
  value: 111,
  createdAt: "2026-09-27T00:50:10.257Z",
  updatedAt: "2026-09-27T00:50:13.000Z",
} as const satisfies TemperAttribute
