import type { TemperArmorWeight } from "../temper-armor-weight.page-type.ts"

export const shield = {
  id: "01a05fd5-4dd2-7ee6-b974-17ec1acd050b",
  pageTypeSlug: "temper-armor-weight",
  slug: "shield",
  title: "Shield",
  key: "shield",
  baseValue: 1720,
  isStandard: false,
  skillLineId: "weapon-one-hand-and-shield",
} as const satisfies TemperArmorWeight
