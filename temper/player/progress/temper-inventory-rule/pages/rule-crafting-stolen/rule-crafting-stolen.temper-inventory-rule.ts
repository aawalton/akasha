import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleCraftingStolen = {
  id: "01a0728b-2e7a-7e66-a501-cb475fb1bc7e",
  type: "page-type/temper-inventory-rule",
  slug: "rule-crafting-stolen",
  title: "Launder crafting materials",
  description: "Launders stolen crafting materials so they can be deposited or used.",
  goal: "temper-rule-goal/hoard",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/crafting",
  displayOrder: 59,
  action: "temper-item-action/fence-launder",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "temper-rule-template/crafting-stolen",
} as const satisfies TemperInventoryRule
