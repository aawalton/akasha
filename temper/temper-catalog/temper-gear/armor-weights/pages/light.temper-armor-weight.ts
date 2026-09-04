import type { TemperArmorWeight } from "../temper-armor-weight.page-type.ts"

export const light = {
  id: "01a05fd5-4dd1-7e9f-a6a2-228e81841b09",
  pageTypeSlug: "temper-armor-weight",
  slug: "light",
  title: "Light",
  key: "light",
  baseValue: 174.5,
  isStandard: true,
  skillLineId: "armor-light-armor",
} as const satisfies TemperArmorWeight
