import type { CalendarTimeProperty } from "akasha/page/calendar-time-property/calendar-time-property.page-type.types.ts"

export const dueTime = {
  id: "01a06d87-f1ed-793e-bf8f-a6f094353e9f",
  type: "page-type/calendar-time-property",
  slug: "due-time",
  propertySlug: "due-time",
  definition: "the time of day a task is next wanted",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A task wanted at no stated hour states no due time.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-04T17:47:00.973Z",
  updatedAt: "2026-09-21T15:33:05.000Z",
} as const satisfies CalendarTimeProperty
