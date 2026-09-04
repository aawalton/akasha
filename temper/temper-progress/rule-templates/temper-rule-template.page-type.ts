import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperProgressThing } from "../progress-things/temper-progress-thing.page-type.ts"
import type { Action } from "./properties/action.text-property.ts"
import type { Active } from "./properties/active.boolean-property.ts"
import type { Conditions } from "./properties/conditions.page-property-entry.ts"
import type { Destination } from "./properties/destination.text-property.ts"
import type { Goal } from "./properties/goal.text-property.ts"
import type { StockScope } from "./properties/stock-scope.text-property.ts"

export type TemperRuleTemplate = TemperProgressThing & {
  action: Action
  active: Active
  goal: Goal
  conditions?: Conditions
  destination?: Destination
  stockScope?: StockScope
}

export const temperRuleTemplate = {
  id: "01a05fd0-3aa6-7646-b33d-56f120ee1438",
  pageTypeSlug: "page-type",
  slug: "temper-rule-template",
  definition: "a ready-made rule for what to do with an item",
  pluralSlug: "temper-rule-templates",
  extendsSlug: ["page-type/temper-progress-thing"],
  partSlugs: [
    "boolean-property/active",
    "page-property-entry/conditions",
    "text-property/action",
    "text-property/condition-field",
    "text-property/condition-value",
    "text-property/destination",
    "text-property/goal",
    "text-property/stock-scope",
  ],
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "description", required: true, many: false },
    { pagePropertySlug: "category-id", required: true, many: false },
    { pagePropertySlug: "display-order", required: true, many: false },
    { pagePropertySlug: "action", required: true, many: false },
    { pagePropertySlug: "active", required: true, many: false },
    { pagePropertySlug: "goal", required: true, many: false },
    { pagePropertySlug: "conditions", required: false, many: false },
    { pagePropertySlug: "destination", required: false, many: false },
    { pagePropertySlug: "stock-scope", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A template is offered to a reader rather than acted on where the template is off.",
    },
    {
      invariantKind: "departure",
      statement: "Only a rule whose action moves an item states a destination.",
    },
    {
      invariantKind: "gap",
      statement: "What a rule does to an item is done outside these pages.",
    },
  ],
} as const satisfies PageType
