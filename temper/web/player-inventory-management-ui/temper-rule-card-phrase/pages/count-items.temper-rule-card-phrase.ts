import type { TemperRuleCardPhrase } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/temper-rule-card-phrase.page-type.types.ts"

export const countItems = {
  id: "01a0e29d-e8d6-724c-a338-3634de17a03b",
  type: "page-type/temper-rule-card-phrase",
  slug: "count-items",
  title: "{count} items",
  key: "count-items",
  displayOrder: 55,
} as const satisfies TemperRuleCardPhrase
