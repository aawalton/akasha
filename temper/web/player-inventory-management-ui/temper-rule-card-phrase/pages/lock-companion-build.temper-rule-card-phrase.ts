import type { TemperRuleCardPhrase } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/temper-rule-card-phrase.page-type.types.ts"

export const lockCompanionBuild = {
  id: "01a0e274-b2ac-728e-9b18-a05420b67578",
  type: "page-type/temper-rule-card-phrase",
  slug: "lock-companion-build",
  title:
    "The {action} action requires the {filter} filter to ensure only items needed by a companion's target build are equipped.",
  key: "lock-companion-build",
  displayOrder: 39,
} as const satisfies TemperRuleCardPhrase
