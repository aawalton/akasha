import type { TemperArmorWeight } from "../temper-armor-weight.page-type.types.ts"

export const heavy = {
  id: "01a05fd5-4dd0-77cc-94de-936278c33019",
  pageTypeSlug: "temper-armor-weight",
  type: "temper-armor-weight",
  slug: "heavy",
  title: "Heavy",
  key: "heavy",
  baseValue: 346.5,
  isStandard: true,
  skillLineId: "armor-heavy-armor",
} as const satisfies TemperArmorWeight
