import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleValuableNothing = {
  id: "01a0728b-8ec3-7bb7-8f8c-3624870fbdf0",
  pageTypeSlug: "temper-inventory-rule",
  slug: "rule-valuable-nothing",
  title: "List items worth >=5000g at guild store",
  description:
    "Lists any item with guild-store value (marketValue) >= 5000g that can be listed at a guild trader. Single guild-value gate (no vendor-value constraint). Pairs with low-quality-sell: >=5000 list, <5000 vendor-sell.",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "all",
  displayOrder: 39,
  action: "list",
  active: true,
  goal: "hoard",
  locked: true,
  fromTemplate: "valuable-nothing",
  destination: "character:8796093022338107",
  conditions: "jsonl",
} as const satisfies TemperInventoryRule
