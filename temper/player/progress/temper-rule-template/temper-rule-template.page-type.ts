import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperRuleTemplate = {
  id: "01a05fd0-3aa6-7646-b33d-56f120ee1438",
  type: "page-type/page-type",
  slug: "temper-rule-template",
  definition: "a ready-made rule for what to do with an item",
  extends: ["page-type/temper-rule"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/description", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "relation-property/action", required: true, many: false },
    { pageProperty: "boolean-property/active", required: true, many: false },
    { pageProperty: "relation-property/goal", required: true, many: false },
    { pageProperty: "relation-property/item-category", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A template is offered to a reader rather than acted on where the template is off.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  parts: [
    "module/rule-template-pages",
    "module/rule-template-pages-1",
    "module/rule-template-pages-2",
    "type-declaration/jsonl-text",
  ],
} as const satisfies PageType
