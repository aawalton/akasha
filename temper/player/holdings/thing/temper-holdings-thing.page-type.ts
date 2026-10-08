import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperHoldingsThing = {
  id: "01a05fcb-fd2b-77f2-923a-cb5f59585696",
  type: "page-type/page-type",
  slug: "temper-holdings-thing",
  definition: "a reading of what an account holds",
  extends: ["page-type/temper-thing"],
  parts: ["number-property/total-value"],
  properties: [
    { pageProperty: "instant-property/captured-at", required: false, many: false },
    { pageProperty: "number-property/total-value", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading states an account's worth at one moment.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-02T01:46:39.275Z",
  updatedAt: "2026-09-21T15:34:59.000Z",
} as const satisfies PageType
