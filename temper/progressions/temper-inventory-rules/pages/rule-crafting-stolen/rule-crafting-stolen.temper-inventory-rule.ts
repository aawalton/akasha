import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleCraftingStolen = {
  id: "01a0728b-2e7a-7e66-a501-cb475fb1bc7e",
  pageTypeSlug: "temper-inventory-rule",
  type: "temper-inventory-rule",
  slug: "rule-crafting-stolen",
  title: "Launder crafting materials",
  description: "Launders stolen crafting materials so they can be deposited or used.",
  goal: "hoard",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "crafting",
  displayOrder: 56,
  action: "fence-launder",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "crafting-stolen",
} as const satisfies TemperInventoryRule
