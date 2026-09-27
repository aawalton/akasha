import type { TemperRuleCardPhrase } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/temper-rule-card-phrase.page-type.types.ts"

export const lockResearch = {
  id: "01a0e274-b2ac-731f-8c9c-1eea74862612",
  type: "page-type/temper-rule-card-phrase",
  slug: "lock-research",
  title:
    "The {action} action requires the {filter} filter to ensure only researchable items are sent to crafting stations.",
  key: "lock-research",
  displayOrder: 31,
} as const satisfies TemperRuleCardPhrase
