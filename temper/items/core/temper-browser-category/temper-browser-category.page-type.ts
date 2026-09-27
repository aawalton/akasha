import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperBrowserCategory = {
  id: "01a0e10a-51a6-762e-937a-ab9ecab87881",
  type: "page-type/page-type",
  slug: "temper-browser-category",
  definition: "a category or subfilter the addon's item browser sorts items under",
  extends: ["page-type/temper-thing"],
  parts: [
    "relation-property/browser-category-parent",
    "select-property/browser-match",
    "multi-relation-property/browser-item-types",
    "multi-relation-property/browser-specialized-item-types",
    "multi-relation-property/browser-weapon-types",
    "multi-relation-property/browser-armor-weights",
    "multi-relation-property/browser-equip-types",
  ],
  properties: [
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "relation-property/browser-category-parent", required: false, many: false },
    { pageProperty: "select-property/browser-match", required: true, many: false },
    {
      pageProperty: "multi-relation-property/browser-item-types",
      required: false,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "multi-relation-property/browser-specialized-item-types",
      required: false,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "multi-relation-property/browser-weapon-types",
      required: false,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "multi-relation-property/browser-armor-weights",
      required: false,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "multi-relation-property/browser-equip-types",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A category is offered under its page's title, in its page's display order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page naming a category above it is a subfilter of that category.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which items a category takes in is stated by the category's own links.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
