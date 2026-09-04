import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperHoldingsThing } from "../temper-holdings-things/temper-holdings-thing.page-type.ts"
import type { Snapshots } from "./properties/snapshots.page-property-entry.ts"

export type TemperNetWorthHour = TemperHoldingsThing & {
  snapshots: Snapshots
}

export const temperNetWorthHour = {
  id: "01a06006-154f-7344-ae3b-0de4c53132dc",
  pageTypeSlug: "page-type",
  slug: "temper-net-worth-hour",
  definition: "one hour of readings of what an account was worth",
  pluralSlug: "temper-net-worth-hours",
  extendsSlug: ["page-type/temper-holdings-thing"],
  partSlugs: [
    "number-property/currency-gold-value",
    "number-property/excluded-guild-bank-value",
    "number-property/gold-amount",
    "number-property/item-value",
    "page-property-entry/snapshots",
  ],
  properties: [{ pagePropertySlug: "snapshots", required: true, many: false }],
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
} as const satisfies PageType
