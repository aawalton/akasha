import type { CalendarDateProperty } from "akasha/page/calendar-date-property/calendar-date-property.page-type.types.ts"

export const dueDate = {
  id: "01a0793a-2730-7efc-b4a0-869a6e3af33f",
  type: "page-type/calendar-date-property",
  slug: "due-date",
  propertySlug: "due-date",
  definition: "the day a task is next wanted",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A due date rolls forward to the next round when the task is marked done.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-07T00:17:29.392Z",
  updatedAt: "2026-09-21T15:33:05.000Z",
} as const satisfies CalendarDateProperty
