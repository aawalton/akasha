import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleCompanionHouseStorageNothing = {
  id: "01a18401-c581-7845-9b73-237b9497aac0",
  type: "page-type/temper-inventory-rule",
  slug: "rule-companion-house-storage-nothing",
  title: "Keep companion gear in house storage",
  description:
    "Leaves companion gear held in a housing storage container, such as the Companion Gear chest, where it is. Companion gear stays as it is until Alan checks companion kits and roles, and this sits above the rule banking epic or better companion gear.",
  goal: "temper-rule-goal/equip",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/companion",
  displayOrder: 14.9,
  action: "temper-item-action/nothing",
  active: true,
  ruleChangedAt: "2026-10-28T19:40:00.000Z",
  createdAt: "2026-10-28T19:34:31.040Z",
  updatedAt: "2026-10-28T19:34:31.040Z",
} as const satisfies TemperInventoryRule
