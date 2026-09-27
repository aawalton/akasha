import type { TemperRuleCardPhrase } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/temper-rule-card-phrase.page-type.types.ts"

export const editBuyMaxPrice = {
  id: "01a0e34a-15ad-7b3d-b700-e4e369ac86af",
  type: "page-type/temper-rule-card-phrase",
  slug: "edit-buy-max-price",
  title:
    "The most gold paid for one; 0 pays a merchant's price, or at most TTC's suggested price at a guild store",
  key: "edit-buy-max-price",
  displayOrder: 514,
} as const satisfies TemperRuleCardPhrase
