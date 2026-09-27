import type { TemperRuleCardPhrase } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/temper-rule-card-phrase.page-type.types.ts"

export const lockUse = {
  id: "01a0e274-b2ac-796f-b748-d267ade9dfa6",
  type: "page-type/temper-rule-card-phrase",
  slug: "lock-use",
  title:
    "The {action} action requires the {filter} filter to ensure only items that teach something new are consumed.",
  key: "lock-use",
  displayOrder: 32,
} as const satisfies TemperRuleCardPhrase
