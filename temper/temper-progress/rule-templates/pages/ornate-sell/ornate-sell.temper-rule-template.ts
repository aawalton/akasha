import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const ornateSell = {
  id: "019e3104-2613-7620-a301-5c9e506a7b7a",
  pageTypeSlug: "temper-rule-template",
  slug: "ornate-sell",
  title: "Sell ornate gear",
  key: "ornate-sell",
  description:
    "Sells equipment with the Ornate trait. Ornate items sell for more gold at merchants and have no crafting use.",
  categoryId: "equipment",
  displayOrder: 15,
  action: "sell",
  active: false,
  goal: "sell",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
