import type { TemperRuleCardPhrase } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/temper-rule-card-phrase.page-type.types.ts"

export const lockOpen = {
  id: "01a0e274-b2ac-703b-91ca-f8ca9ed27589",
  type: "page-type/temper-rule-card-phrase",
  slug: "lock-open",
  title:
    "The {action} action requires the {filter} filter to ensure only openable containers are activated.",
  key: "lock-open",
  displayOrder: 33,
  createdAt: "2026-09-27T10:41:33.868Z",
  updatedAt: "2026-09-27T10:41:41.000Z",
} as const satisfies TemperRuleCardPhrase
