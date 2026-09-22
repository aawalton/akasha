import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleCraftingCraftBag = {
  id: "01a0728b-10d2-70aa-8330-5161e02e35a1",
  type: "page-type/temper-inventory-rule",
  slug: "rule-crafting-craft-bag",
  title: "Stow crafting materials",
  description:
    "Moves crafting materials to the craft bag when visiting the bank. Requires ESO Plus or a craft bag entitlement. If you do not have ESO Plus, toggle off craft bag access in the ESO Plus panel above — the destination will be redirected to the bank automatically.",
  goal: "temper-rule-goal/hoard",
  destination: "craft-bag",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "temper-item-category-tree/crafting",
  displayOrder: 59,
  action: "temper-item-action/move-to",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "temper-rule-template/crafting-craft-bag",
} as const satisfies TemperInventoryRule
