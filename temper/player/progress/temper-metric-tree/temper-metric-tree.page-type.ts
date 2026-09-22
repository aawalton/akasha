import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperMetricTree = {
  id: "01a05fcb-d656-7ea2-a494-28d13d70536e",
  type: "page-type/page-type",
  slug: "temper-metric-tree",
  definition: "a node of the tree of numbers measuring a build",
  extends: ["page-type/temper-progress-thing"],
  parts: [
    "boolean-property/include-in-child-aggregates",
    "boolean-property/use-accent-color",
    "text-property/node-type",
  ],
  properties: [
    { pageProperty: "text-property/node-id", required: true, many: false },
    { pageProperty: "text-property/node-type", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    {
      pageProperty: "boolean-property/include-in-child-aggregates",
      required: false,
      many: false,
    },
    { pageProperty: "boolean-property/use-accent-color", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A node stating no parent is a root of the tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A node of type `metric` is the metric the catalog names by `metric-id`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The slug is the node type and the node id joined by a hyphen.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
