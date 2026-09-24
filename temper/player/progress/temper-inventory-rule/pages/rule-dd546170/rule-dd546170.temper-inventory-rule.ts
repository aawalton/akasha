import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleDd546170 = {
  id: "01a0728b-2e7c-7157-b63e-c4943089e6b1",
  type: "page-type/temper-inventory-rule",
  slug: "rule-dd546170",
  title: "Destroy learned style pages below the 5000g list line",
  description:
    "Destroys style pages already learned (canUnlock=cannot-unlock) with guild-store value < 5000g and no merchant sell value (merchantValue 0). Pairs with the >=5000g list rule to close the 1000-5000g gap: learned + below-list-threshold + unsellable -> destroy. Destroy is default-confirmed via the safety dialog.",
  goal: "temper-rule-goal/destroy",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/style-pages",
  displayOrder: 29,
  action: "temper-item-action/destroy",
  active: true,
  updatedAt: "2026-06-02T20:49:28.795Z",
} as const satisfies TemperInventoryRule
