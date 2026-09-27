import type { TemperRuleCardPhrase } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/temper-rule-card-phrase.page-type.types.ts"

export const lockFenceStolen = {
  id: "01a0e274-b2ac-70db-809e-9b6c579e58b3",
  type: "page-type/temper-rule-card-phrase",
  slug: "lock-fence-stolen",
  title:
    "The {action} action requires the {filter} filter because only stolen items can be sold at a fence.",
  key: "lock-fence-stolen",
  displayOrder: 41,
} as const satisfies TemperRuleCardPhrase
