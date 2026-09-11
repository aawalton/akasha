import type { TemperArmorWeight } from "akasha/temper/catalog/temper-gear/temper-armor-weights/temper-armor-weight.page-type.types.ts"

export const medium = {
  id: "01a05fd5-4dd1-75de-9dd1-03ef48cb8888",
  type: "temper-armor-weight",
  slug: "medium",
  title: "Medium",
  key: "medium",
  baseValue: 260.5,
  isStandard: true,
  skillLineId: "armor-medium-armor",
} as const satisfies TemperArmorWeight
