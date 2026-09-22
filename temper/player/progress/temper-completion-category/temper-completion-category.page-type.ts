import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperCompletionCategory = {
  id: "01a05fcb-d657-7209-8fac-d33d57fe464e",
  type: "page-type/page-type",
  slug: "temper-completion-category",
  definition: "a node of the completion tree",
  extends: ["page-type/temper-progress-thing"],
  parts: ["text-property/tab"],
  properties: [
    { pageProperty: "text-property/node-id", required: true, many: false },
    { pageProperty: "text-property/tab", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A node stating no parent is a root of the tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every root is named by the tab the root heads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A node has the tab of the root the node hangs beneath.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
