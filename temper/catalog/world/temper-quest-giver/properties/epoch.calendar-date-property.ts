import type { CalendarDateProperty } from "akasha/page/calendar-date-property/calendar-date-property.page-type.types.ts"

export const epoch = {
  id: "01a0cb47-eb26-7cd9-8d27-ee22ae7b3968",
  type: "page-type/calendar-date-property",
  slug: "epoch",
  propertySlug: "epoch",
  definition: "the day a rotation's count begins",
  types: "ts",
} as const satisfies CalendarDateProperty
