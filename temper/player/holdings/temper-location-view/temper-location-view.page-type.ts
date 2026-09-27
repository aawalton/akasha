import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperLocationView = {
  id: "01a0e0d9-4c1e-7000-8d93-bae1e77e9a87",
  type: "page-type/page-type",
  slug: "temper-location-view",
  definition: "a fixed choice of places the addon's item browser shows items from",
  extends: ["page-type/temper-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A view is offered under its page's title, in its page's display order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which places a view takes in is the addon's, reached by the view's key.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
