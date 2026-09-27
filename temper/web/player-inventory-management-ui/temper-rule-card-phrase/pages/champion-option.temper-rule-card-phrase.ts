import type { TemperRuleCardPhrase } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/temper-rule-card-phrase.page-type.types.ts"

export const championOption = {
  id: "01a0e28b-82a8-7b55-983f-f9cecdb5f02f",
  type: "page-type/temper-rule-card-phrase",
  slug: "champion-option",
  title: "CP {level}",
  key: "champion-option",
  displayOrder: 45,
} as const satisfies TemperRuleCardPhrase
