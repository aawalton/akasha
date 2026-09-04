import type { CalendarTimeProperty } from "@akasha/pages-system/calendar-time-property"

export type DueTime = string

export const dueTime = {
  id: "01a06d87-f1ed-793e-bf8f-a6f094353e9f",
  pageTypeSlug: "calendar-time-property",
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
