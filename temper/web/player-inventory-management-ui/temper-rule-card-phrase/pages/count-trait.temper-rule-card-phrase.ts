import type { TemperRuleCardPhrase } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/temper-rule-card-phrase.page-type.types.ts"

export const countTrait = {
  id: "01a0e274-b2ab-74f3-bc8a-8a871aafb30f",
  type: "page-type/temper-rule-card-phrase",
  slug: "count-trait",
  title: "{count} Trait",
  key: "count-trait",
  displayOrder: 11,
} as const satisfies TemperRuleCardPhrase
