import type { TemperAttribute } from "akasha/temper/player/character/source/temper-attribute/temper-attribute.page-type.types.ts"

export const health = {
  id: "01a0e057-42d0-783e-a498-d74ef6cc8307",
  type: "page-type/temper-attribute",
  slug: "health",
  title: "Health",
  metric: "temper-metric/health-maximum",
  value: 122,
} as const satisfies TemperAttribute
