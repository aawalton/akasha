import type { TemperRuleCardPhrase } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/temper-rule-card-phrase.page-type.types.ts"

export const lockUnlockLocked = {
  id: "01a0e274-b2ac-7ca9-ac69-e2b4512831f3",
  type: "page-type/temper-rule-card-phrase",
  slug: "lock-unlock-locked",
  title:
    "The {action} action requires the {filter} filter because only locked items can be unlocked.",
  key: "lock-unlock-locked",
  displayOrder: 42,
  createdAt: "2026-09-27T10:41:33.868Z",
  updatedAt: "2026-09-27T10:41:41.000Z",
} as const satisfies TemperRuleCardPhrase
