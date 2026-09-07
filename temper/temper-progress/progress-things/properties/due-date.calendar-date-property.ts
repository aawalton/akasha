import type { CalendarDateProperty } from "@akasha/pages/calendar-date-property"

export type DueDate = string

export const dueDate = {
  id: "01a0793a-2730-7efc-b4a0-869a6e3af33f",
  pageTypeSlug: "calendar-date-property",
  slug: "due-date",
  propertySlug: "due-date",
  definition: "the day a task is next wanted",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A due date rolls forward to the next round when the task is marked done.",
    },
  ],
} as const satisfies CalendarDateProperty
