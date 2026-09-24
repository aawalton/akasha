import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleUnlockByPriority = {
  id: "01a0728b-8ec1-746f-bd66-65142a6da18b",
  type: "page-type/temper-inventory-rule",
  slug: "rule-unlock-by-priority",
  title: "Use unlockables",
  description:
    "Uses items that teach something new — motifs, recipes, style pages, furnishing plans, etc. If the current character can learn the item, it's used immediately. For recipes (character-specific knowledge), the addon checks the current character only (ESO API limitation).",
  goal: "temper-rule-goal/unlock",
  conditions: "jsonl",
  destination: "character:by-priority",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/knowledge",
  displayOrder: 32,
  action: "temper-item-action/use",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "temper-rule-template/unlock-by-priority",
} as const satisfies TemperInventoryRule
