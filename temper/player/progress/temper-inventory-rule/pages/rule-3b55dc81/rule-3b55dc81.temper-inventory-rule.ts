import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const rule3b55dc81 = {
  id: "01a0728a-d6fe-7dbb-9828-69865270334a",
  type: "page-type/temper-inventory-rule",
  slug: "rule-3b55dc81",
  description:
    "Destroys known containers (reward already owned) with guild-store value < 5000g. Raised from 1000 to match the uniform 5000g line.",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/containers",
  displayOrder: 12,
  action: "temper-item-action/destroy",
  active: true,
  ruleChangedAt: "2026-06-02T20:49:28.407Z",
  locked: true,
  createdAt: "2026-09-05T17:08:16.766Z",
  updatedAt: "2026-10-08T14:43:46.000Z",
} as const satisfies TemperInventoryRule
