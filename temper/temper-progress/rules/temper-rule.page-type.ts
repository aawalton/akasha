import type { PageType } from "@akasha/pages/page-type"
import type { TemperProgressThing } from "../progress-things/temper-progress-thing.page-type.ts"
import type { Action } from "./properties/action.relation-property.ts"
import type { Active } from "./properties/active.boolean-property.ts"
import type { Conditions } from "./properties/conditions.page-property-entry.ts"
import type { Destination } from "./properties/destination.text-property.ts"
import type { Goal } from "./properties/goal.relation-property.ts"
import type { StockScope } from "./properties/stock-scope.select-property.ts"

export type TemperRule = TemperProgressThing & {
  action?: Action
  active?: Active
  goal?: Goal
  conditions?: Conditions
  destination?: Destination
  stockScope?: StockScope
}

export const temperRule = {
  id: "01a0727a-ee24-78ce-96b2-5cd1e1558110",
  pageTypeSlug: "page-type",
  slug: "temper-rule",
  definition: "what to do with an item that matches a set of tests",
  pluralSlug: "temper-rules",
  extends: ["page-type/temper-progress-thing"],
  parts: [
    "boolean-property/active",
    "page-property-entry/conditions",
    "relation-property/action",
    "relation-property/condition-field",
    "relation-property/goal",
    "select-property/stock-scope",
    "text-property/condition-value",
    "text-property/destination",
  ],
  properties: [
    { pagePropertySlug: "relation-property/action", required: false, many: false },
    { pagePropertySlug: "boolean-property/active", required: false, many: false },
    { pagePropertySlug: "relation-property/goal", required: false, many: false },
    { pagePropertySlug: "page-property-entry/conditions", required: false, many: false },
    { pagePropertySlug: "text-property/destination", required: false, many: false },
    { pagePropertySlug: "select-property/stock-scope", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property both a template and a rule in force carries is declared here.",
    },
    {
      invariantKind: "departure",
      statement: "Only a rule whose action moves an item states a destination.",
    },
    {
      invariantKind: "gap",
      statement: "A rule's action on an item is done outside these pages.",
    },
  ],
} as const satisfies PageType
