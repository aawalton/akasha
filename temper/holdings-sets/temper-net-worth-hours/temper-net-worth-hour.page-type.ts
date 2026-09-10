import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const temperNetWorthHour = {
  id: "01a06006-154f-7344-ae3b-0de4c53132dc",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-net-worth-hour",
  definition: "one hour of readings of what an account was worth",
  pluralSlug: "temper-net-worth-hours",
  extends: ["page-type/temper-holdings-thing"],
  parts: [
    "number-property/currency-gold-value",
    "number-property/excluded-guild-bank-value",
    "number-property/gold-amount",
    "number-property/item-value",
    "page-property-entry/snapshots",
  ],
  properties: [{ pageProperty: "page-property-entry/snapshots", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A slug opens with `hour-` ahead of the hour the readings were taken.",
    },
    {
      invariantKind: "departure",
      statement: "An hour is read in UTC.",
    },
    {
      invariantKind: "departure",
      statement: "An hour rather than a day gathers the readings.",
    },
    {
      invariantKind: "departure",
      statement: "An account taking a reading in an hour has that reading in that hour's page.",
    },
  ],
  types: "ts",
} as const satisfies PageType
