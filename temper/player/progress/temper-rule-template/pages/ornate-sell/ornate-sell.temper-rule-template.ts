import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const ornateSell = {
  id: "019e3104-2613-7620-a301-5c9e506a7b7a",
  type: "page-type/temper-rule-template",
  slug: "ornate-sell",
  title: "Sell ornate gear",
  key: "ornate-sell",
  description:
    "Sells equipment with the Ornate trait. Ornate items sell for more gold at merchants and have no crafting use.",
  categoryId: "temper-item-category-tree/equipment",
  displayOrder: 15,
  action: "temper-item-action/sell",
  active: false,
  goal: "temper-rule-goal/sell",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
