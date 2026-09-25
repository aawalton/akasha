import type { TemperTaskProgress } from "akasha/temper/player/progress/temper-task-progress/temper-task-progress.page-type.types.ts"

export const progress = {
  id: "01a05fd3-435e-7d0d-8c81-036d195632f1",
  type: "page-type/temper-task-progress",
  slug: "progress",
  propertySlug: "progress",
  definition: "how far a task has come, one character to a line",
  properties: [
    { pageProperty: "relation-property/character", required: false, many: false },
    { pageProperty: "text-property/character-name", required: false, many: false },
    { pageProperty: "number-property/progress-total", required: true, many: false },
    { pageProperty: "number-property/progress-current", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The totals a task states are the totals of these lines added up.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A line names a character by name rather than by a relation to that character.",
    },
  ],
  types: "ts",
} as const satisfies TemperTaskProgress
