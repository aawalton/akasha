import type { TemperAttribute } from "akasha/temper/player/character/source/temper-attribute/temper-attribute.page-type.types.ts"

export const stamina = {
  id: "01a0e057-42d1-755f-9fa1-0150644d15ce",
  type: "page-type/temper-attribute",
  slug: "stamina",
  title: "Maximum Stamina",
  metric: "temper-metric/stamina-maximum",
  value: 111,
} as const satisfies TemperAttribute
