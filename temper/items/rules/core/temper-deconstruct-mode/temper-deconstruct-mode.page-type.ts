import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperDeconstructMode = {
  id: "01a0e258-5155-7d12-89ba-fcb0c1fc600c",
  type: "page-type/page-type",
  slug: "temper-deconstruct-mode",
  definition: "what a deconstruct rule breaks an item down for",
  extends: ["page-type/temper-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The key is the mode a deconstruct rule's filter writes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The title is the mode a reader is shown.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-27T10:10:33.941Z",
  updatedAt: "2026-09-27T10:10:37.000Z",
} as const satisfies PageType
