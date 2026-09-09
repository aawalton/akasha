import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleDd546170 = {
  id: "01a0728b-2e7c-7157-b63e-c4943089e6b1",
  pageTypeSlug: "temper-inventory-rule",
  slug: "rule-dd546170",
  title: "Destroy learned style pages below the 5000g list line",
  description:
    "Destroys style pages already learned (canUnlock=cannot-unlock) with guild-store value < 5000g and no merchant sell value (merchantValue 0). Pairs with the >=5000g list rule to close the 1000-5000g gap: learned + below-list-threshold + unsellable -> destroy. Destroy is default-confirmed via the safety dialog.",
  goal: "destroy",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "style-pages",
  displayOrder: 28,
  action: "destroy",
  active: true,
  updatedAt: "2026-06-02T20:49:28.795Z",
} as const satisfies TemperInventoryRule
