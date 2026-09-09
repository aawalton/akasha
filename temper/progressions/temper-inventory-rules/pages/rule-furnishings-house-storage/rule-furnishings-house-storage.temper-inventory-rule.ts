import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleFurnishingsHouseStorage = {
  id: "01a0728b-4fba-79ed-83d3-049e2f247e58",
  pageTypeSlug: "temper-inventory-rule",
  type: "temper-inventory-rule",
  slug: "rule-furnishings-house-storage",
  title: "Store furniture in housing",
  description:
    "Moves furnishings to the furniture vault (house storage) when visiting the bank. Keeps your backpack clear of bulky furniture items.",
  goal: "hoard",
  destination: "furniture-vault",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "furnishings",
  displayOrder: 37,
  action: "move-to",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "furnishings-house-storage",
} as const satisfies TemperInventoryRule
