import type { TemperRuleCardPhrase } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/temper-rule-card-phrase.page-type.types.ts"

export const deleteRuleWarning = {
  id: "01a0e2ab-af02-78eb-80c8-348eb886c8a8",
  type: "page-type/temper-rule-card-phrase",
  slug: "delete-rule-warning",
  title: "This will permanently delete this rule. This action cannot be undone.",
  key: "delete-rule-warning",
  displayOrder: 63,
} as const satisfies TemperRuleCardPhrase
