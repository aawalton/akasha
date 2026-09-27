import type { TemperRuleCardPhrase } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/temper-rule-card-phrase.page-type.types.ts"

export const countPerCharacter = {
  id: "01a0e274-b2ab-72e2-a35e-0faf1446680a",
  type: "page-type/temper-rule-card-phrase",
  slug: "count-per-character",
  title: "{count} per character",
  key: "count-per-character",
  displayOrder: 21,
} as const satisfies TemperRuleCardPhrase
