import type { TemperArmorWeight } from "akasha/temper/catalog/temper-gear/temper-armor-weights/temper-armor-weight.page-type.types.ts"

export const light = {
  id: "01a05fd5-4dd1-7e9f-a6a2-228e81841b09",
  type: "temper-armor-weight",
  slug: "light",
  title: "Light",
  key: "light",
  baseValue: 174.5,
  isStandard: true,
  skillLineId: "armor-light-armor",
} as const satisfies TemperArmorWeight
