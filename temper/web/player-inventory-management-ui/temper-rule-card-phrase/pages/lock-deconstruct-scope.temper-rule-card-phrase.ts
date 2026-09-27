import type { TemperRuleCardPhrase } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/temper-rule-card-phrase.page-type.types.ts"

export const lockDeconstructScope = {
  id: "01a0e274-b2ac-7a81-a01e-0e4bf73ce975",
  type: "page-type/temper-rule-card-phrase",
  slug: "lock-deconstruct-scope",
  title: "The {action} scope controls this filter. Change the scope to '{mode}' to remove it.",
  key: "lock-deconstruct-scope",
  displayOrder: 30,
} as const satisfies TemperRuleCardPhrase
