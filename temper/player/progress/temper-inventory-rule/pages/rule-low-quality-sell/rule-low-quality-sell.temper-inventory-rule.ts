import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleLowQualitySell = {
  id: "01a0728b-4fbd-73c3-94ce-4ab4d817fb29",
  type: "page-type/temper-inventory-rule",
  slug: "rule-low-quality-sell",
  title: "Vendor-sell sub-5000g non-legendary items",
  description:
    "Sells any sellable item with guild-store value (marketValue) < 5000g to a vendor, excluding legendary (quality 5) items. Value-axis sibling of valuable-nothing (list >= 5000).",
  goal: "temper-rule-goal/sell",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/all",
  displayOrder: 83,
  action: "temper-item-action/sell",
  active: true,
  ruleChangedAt: "2026-06-02T20:49:38.124Z",
  locked: true,
  createdAt: "2026-09-05T17:08:47.677Z",
  updatedAt: "2026-10-08T14:43:46.000Z",
} as const satisfies TemperInventoryRule
