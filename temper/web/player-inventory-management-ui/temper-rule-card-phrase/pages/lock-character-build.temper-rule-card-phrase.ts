import type { TemperRuleCardPhrase } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/temper-rule-card-phrase.page-type.types.ts"

export const lockCharacterBuild = {
  id: "01a0e274-b2ac-78ce-b779-bd3663a5b397",
  type: "page-type/temper-rule-card-phrase",
  slug: "lock-character-build",
  title:
    "The {action} action requires the {filter} filter to ensure only items needed by a target build are equipped.",
  key: "lock-character-build",
  displayOrder: 38,
} as const satisfies TemperRuleCardPhrase
