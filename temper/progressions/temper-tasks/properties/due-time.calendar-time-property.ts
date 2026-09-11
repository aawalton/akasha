import type { CalendarTimeProperty } from "akasha/pages/calendar-time-properties/calendar-time-property.page-type.types.ts"

export const dueTime = {
  id: "01a06d87-f1ed-793e-bf8f-a6f094353e9f",
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
  types: "ts",
} as const satisfies CalendarTimeProperty
