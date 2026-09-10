import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.types.ts"

export const ruleLowQualitySell = {
  id: "01a0728b-4fbd-73c3-94ce-4ab4d817fb29",
  pageTypeSlug: "temper-inventory-rule",
  type: "temper-inventory-rule",
  slug: "rule-low-quality-sell",
  title: "Vendor-sell sub-5000g non-legendary items",
  description:
    "Sells any sellable item with guild-store value (marketValue) < 5000g to a vendor, excluding legendary (quality 5) items. Value-axis sibling of valuable-nothing (list >= 5000).",
  goal: "sell",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "all",
  displayOrder: 74,
  action: "sell",
  active: true,
  updatedAt: "2026-06-02T20:49:38.124Z",
  locked: true,
  fromTemplate: "low-quality-sell",
} as const satisfies TemperInventoryRule
