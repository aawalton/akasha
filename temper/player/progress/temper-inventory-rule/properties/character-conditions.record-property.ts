import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const characterConditions = {
  id: "01a0d8a2-9a9e-7ccc-9d8a-95470a88b67c",
  type: "page-type/record-property",
  slug: "character-conditions",
  propertySlug: "character-conditions",
  definition:
    "what a character must satisfy for a leg to send to that character, one test to a record",
  properties: [
    { pageProperty: "relation-property/character-condition-field", required: true, many: false },
    { pageProperty: "text-property/condition-value", required: true, many: false },
    {
      pageProperty: "multi-relation-property/skill-lines",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A leg stating no character test sends to every character the leg reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A leg's test of a character is no test an item condition makes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A leg's character tests are kept on that leg's own line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A field names a temper-character-condition-field page with the key the field tests.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill line test holds the mode its skill lines are tested under as its value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill line test names its skill lines as skill line pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No test but a skill line test names a skill line.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
