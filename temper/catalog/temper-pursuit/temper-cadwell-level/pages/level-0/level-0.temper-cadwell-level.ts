import type { TemperCadwellLevel } from "akasha/temper/catalog/temper-pursuit/temper-cadwell-level/temper-cadwell-level.page-type.types.ts"

export const level0 = {
  id: "01a0616b-2cde-7002-8121-3289e2e0e3e2",
  type: "page-type/temper-cadwell-level",
  slug: "level-0",
  title: "Level 0",
  displayOrder: 0,
  cadwellStops: "jsonl",
} as const satisfies TemperCadwellLevel
