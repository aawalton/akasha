import type { PageType } from "@akasha/pages/page-type"

export const temperRuleTemplate = {
  id: "01a05fd0-3aa6-7646-b33d-56f120ee1438",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-rule-template",
  definition: "a ready-made rule for what to do with an item",
  pluralSlug: "temper-rule-templates",
  extends: ["page-type/temper-rule"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/description", required: true, many: false },
    { pageProperty: "text-property/category-id", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "relation-property/action", required: true, many: false },
    { pageProperty: "boolean-property/active", required: true, many: false },
    { pageProperty: "relation-property/goal", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A template is offered to a reader rather than acted on where the template is off.",
    },
  ],
  types: "ts",
} as const satisfies PageType
