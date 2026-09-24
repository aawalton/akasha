import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleReconstructedNothing = {
  id: "01a0728b-6d6e-7127-8119-73a98594b44c",
  type: "page-type/temper-inventory-rule",
  slug: "rule-reconstructed-nothing",
  title: "Protect reconstructed gear",
  description:
    "Prevents reconstructed equipment from being affected by lower-priority rules. Reconstructed gear costs transmute crystals and set collection knowledge.",
  goal: "temper-rule-goal/equip",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/equipment",
  displayOrder: 24,
  action: "temper-item-action/nothing",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "temper-rule-template/reconstructed-nothing",
} as const satisfies TemperInventoryRule
