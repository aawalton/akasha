import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.types.ts"

export const ruleOrnateSell = {
  id: "01a0728b-4fbd-7169-8ab3-7f26e9d5fb5b",
  pageTypeSlug: "temper-inventory-rule",
  type: "temper-inventory-rule",
  slug: "rule-ornate-sell",
  title: "Sell ornate gear",
  description:
    "Sells equipment with the Ornate trait. Ornate items sell for more gold at merchants and have no crafting use.",
  goal: "sell",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "equipment",
  displayOrder: 42,
  action: "sell",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "ornate-sell",
} as const satisfies TemperInventoryRule
