import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperConditionValue = {
  id: "01a0e270-1aa7-7a29-8597-a55dbe62d420",
  type: "page-type/page-type",
  slug: "temper-condition-value",
  definition: "a value a rule condition's field may be tested against",
  extends: ["page-type/temper-progress-thing"],
  parts: ["relation-property/condition-value-field"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "relation-property/condition-value-field", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The key is the value an item rule writes under its condition field.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The title is the value a reader is shown as an option of that field.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No two values share a key, even under two condition fields.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
