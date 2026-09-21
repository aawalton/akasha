import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperNetWorthHour = {
  id: "01a06006-154f-7344-ae3b-0de4c53132dc",
  type: "page-type/page-type",
  slug: "temper-net-worth-hour",
  definition: "one hour of readings of what an account was worth",
  extends: ["page-type/temper-holdings-thing"],
  parts: [
    "number-property/currency-gold-value",
    "number-property/excluded-guild-bank-value",
    "number-property/gold-amount",
    "number-property/item-value",
    "page-property-entry/readings",
  ],
  properties: [{ pageProperty: "page-property-entry/readings", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug opens with `hour-` ahead of the hour the readings were taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An hour is read in UTC.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An hour rather than a day gathers the readings.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account taking a reading in an hour has that reading in that hour's page.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
