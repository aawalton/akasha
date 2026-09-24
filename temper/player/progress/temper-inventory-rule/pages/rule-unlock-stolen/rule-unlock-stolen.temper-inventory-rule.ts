import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleUnlockStolen = {
  id: "01a0728b-8ec2-7808-9e1b-362739c2b586",
  type: "page-type/temper-inventory-rule",
  slug: "rule-unlock-stolen",
  title: "Launder stolen unlockables",
  description:
    "Launders stolen items that can teach something (motifs, recipes, etc.) so they can be used. Place before other unlock rules.",
  goal: "temper-rule-goal/unlock",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/knowledge",
  displayOrder: 27,
  action: "temper-item-action/fence-launder",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "temper-rule-template/unlock-stolen",
} as const satisfies TemperInventoryRule
