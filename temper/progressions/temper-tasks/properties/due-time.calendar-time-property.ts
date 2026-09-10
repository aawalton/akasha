import type { CalendarTimeProperty } from "akasha/pages/calendar-time-properties/calendar-time-property.page-type.types.ts"

export type DueTime = string

export const dueTime = {
  id: "01a06d87-f1ed-793e-bf8f-a6f094353e9f",
  pageTypeSlug: "calendar-time-property",
  type: "calendar-time-property",
  slug: "due-time",
  propertySlug: "due-time",
  definition: "the time of day a task is next wanted",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A task wanted at no stated hour states no due time.",
    },
  ],
} as const satisfies CalendarTimeProperty
