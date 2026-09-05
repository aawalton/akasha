import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperProgressThing } from "../progress-things/temper-progress-thing.page-type.ts"

export type TemperRuleGoal = TemperProgressThing

export const temperRuleGoal = {
  id: "01a071f5-62e6-7b98-ab84-2e3e9f91b5e3",
  pageTypeSlug: "page-type",
  slug: "temper-rule-goal",
  definition: "what a player is keeping an item for",
  pluralSlug: "temper-rule-goals",
  extendsSlug: ["page-type/temper-progress-thing"],
  properties: [
    { pagePropertySlug: "description", required: true, many: false },
    { pagePropertySlug: "display-order", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The slug is the goal an item rule writes.",
    },
    {
      invariantKind: "departure",
      statement: "A goal earlier in the display order wins where two goals want one item.",
    },
    {
      invariantKind: "absence",
      statement: "A rule wanting the item for nothing states no goal.",
    },
  ],
} as const satisfies PageType
