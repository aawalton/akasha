import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperCharacterConditionField = {
  id: "01a0d8a0-f74f-7aab-abac-00f4c0cf0fed",
  type: "page-type/page-type",
  slug: "temper-character-condition-field",
  definition: "a thing about a character that a leg of a destination chain tests",
  extends: ["page-type/temper-progress-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/description", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The key is the field a leg's character test is read under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The title is the field a reader is shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A character test names one field here and the value that field is tested against.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field here tests a character, and a temper condition field tests an item.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
