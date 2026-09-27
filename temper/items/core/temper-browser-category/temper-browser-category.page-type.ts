import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperBrowserCategory = {
  id: "01a0e10a-51a6-762e-937a-ab9ecab87881",
  type: "page-type/page-type",
  slug: "temper-browser-category",
  definition: "a category or subfilter the addon's item browser sorts items under",
  extends: ["page-type/temper-thing"],
  parts: ["relation-property/browser-category-parent"],
  properties: [
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "relation-property/browser-category-parent", required: false, many: false },
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
      statement: "Which items a category takes in is the addon's, reached by the page's slug.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
