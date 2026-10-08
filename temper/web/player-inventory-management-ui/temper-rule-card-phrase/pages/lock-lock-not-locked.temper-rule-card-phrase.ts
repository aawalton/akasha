import type { TemperRuleCardPhrase } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/temper-rule-card-phrase.page-type.types.ts"

export const lockLockNotLocked = {
  id: "01a0e274-b2ac-7c6b-bcdf-103a2d1ce343",
  type: "page-type/temper-rule-card-phrase",
  slug: "lock-lock-not-locked",
  title:
    "The {action} action requires the {filter} filter set to '{value}' because only unlocked items can be locked.",
  key: "lock-lock-not-locked",
  displayOrder: 43,
  createdAt: "2026-09-27T10:41:33.868Z",
  updatedAt: "2026-09-27T10:41:41.000Z",
} as const satisfies TemperRuleCardPhrase
