import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const rule778017a4 = {
  id: "01a0728a-f56d-7b7f-a89d-67a2d28eb132",
  type: "page-type/temper-inventory-rule",
  slug: "rule-778017a4",
  title: "Sell low-value furnishings",
  description:
    "Vendor-sells furnishings with guild-store value < 5000g (excluding legendary). Raised from 1000 to match the uniform 5000g line; furnishings >= 5000g still route to furniture-vault via furnishings-house-storage.",
  goal: "temper-rule-goal/sell",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "temper-item-category-tree/furnishings",
  displayOrder: 37,
  action: "temper-item-action/sell",
  active: true,
  updatedAt: "2026-06-02T20:49:29.524Z",
} as const satisfies TemperInventoryRule
