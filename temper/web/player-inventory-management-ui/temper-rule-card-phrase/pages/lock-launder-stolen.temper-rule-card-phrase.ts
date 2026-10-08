import type { TemperRuleCardPhrase } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/temper-rule-card-phrase.page-type.types.ts"

export const lockLaunderStolen = {
  id: "01a0e274-b2ac-7f2c-a856-92f901eaae1c",
  type: "page-type/temper-rule-card-phrase",
  slug: "lock-launder-stolen",
  title:
    "The {action} action requires the {filter} filter because only stolen items can be laundered at a fence.",
  key: "lock-launder-stolen",
  displayOrder: 40,
  createdAt: "2026-09-27T10:41:33.868Z",
  updatedAt: "2026-09-27T10:41:41.000Z",
} as const satisfies TemperRuleCardPhrase
