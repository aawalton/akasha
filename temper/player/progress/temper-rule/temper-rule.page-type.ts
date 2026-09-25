import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperRule = {
  id: "01a0727a-ee24-78ce-96b2-5cd1e1558110",
  type: "page-type/page-type",
  slug: "temper-rule",
  definition: "what to do with an item that matches a set of tests",
  extends: ["page-type/temper-progress-thing"],
  parts: [
    "boolean-property/active",
    "page-property-entry/conditions",
    "relation-property/action",
    "relation-property/condition-field",
    "relation-property/goal",
    "select-property/stock-scope",
    "text-property/condition-value",
    "text-property/destination",
    "relation-property/item-category",
  ],
  properties: [
    { pageProperty: "relation-property/action", required: false, many: false },
    { pageProperty: "boolean-property/active", required: false, many: false },
    { pageProperty: "relation-property/goal", required: false, many: false },
    { pageProperty: "page-property-entry/conditions", required: false, many: false },
    { pageProperty: "text-property/destination", required: false, many: false },
    { pageProperty: "select-property/stock-scope", required: false, many: false },
    { pageProperty: "relation-property/item-category", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A property both a template and a rule in force carries is declared here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a rule whose action moves an item states a destination.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
