import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleMuseumPiecesNothing = {
  id: "01a0728b-4fbd-7048-8c55-e0eb6494b565",
  type: "page-type/temper-inventory-rule",
  slug: "rule-museum-pieces-nothing",
  title: "Protect museum pieces",
  description:
    "Prevents museum pieces from being affected by lower-priority rules. These are turn-in items for collections or achievements.",
  goal: "temper-rule-goal/task",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/museum-pieces",
  displayOrder: 60,
  action: "temper-item-action/nothing",
  active: true,
  ruleChangedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  createdAt: "2026-09-05T17:08:47.677Z",
  updatedAt: "2026-10-08T14:43:46.000Z",
} as const satisfies TemperInventoryRule
