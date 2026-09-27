import type { TemperRuleCardPhrase } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/temper-rule-card-phrase.page-type.types.ts"

export const levelOption = {
  id: "01a0e28b-82a8-7c51-bc3f-cd4495193513",
  type: "page-type/temper-rule-card-phrase",
  slug: "level-option",
  title: "Level {level}",
  key: "level-option",
  displayOrder: 44,
} as const satisfies TemperRuleCardPhrase
