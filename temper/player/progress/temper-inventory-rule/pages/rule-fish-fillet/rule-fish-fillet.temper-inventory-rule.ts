import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleFishFillet = {
  id: "01a12634-22cd-71fa-92d4-e47203260562",
  type: "page-type/temper-inventory-rule",
  slug: "rule-fish-fillet",
  title: "Fillet fish",
  description:
    "Fillets fish at a provisioning station. The craft bag refuses fish, so this runs before the crafting rules would send them there. Stolen fish are laundered first by the crafting rule.",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/fish",
  displayOrder: 64.5,
  action: "temper-item-action/fillet",
  active: true,
  ruleChangedAt: "2026-10-10T15:30:00.000Z",
  createdAt: "2026-10-10T14:25:13.420Z",
  updatedAt: "2026-10-10T14:25:13.420Z",
} as const satisfies TemperInventoryRule
