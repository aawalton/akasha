import type { TemperArmorWeight } from "../temper-armor-weight.page-type.types.ts"

export const noWeight = {
  id: "01a05fd5-4dd1-7640-b16c-0e0623634bb2",
  pageTypeSlug: "temper-armor-weight",
  type: "temper-armor-weight",
  slug: "no-weight",
  title: "No Weight",
  key: "no-weight",
  baseValue: 0,
  isStandard: true,
  skillLineId: "no-skill-line",
} as const satisfies TemperArmorWeight
