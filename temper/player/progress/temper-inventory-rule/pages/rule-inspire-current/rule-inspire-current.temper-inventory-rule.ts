import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleInspireCurrent = {
  id: "01a0728b-4fbc-7ce7-9c17-ef3af0f7a966",
  type: "page-type/temper-inventory-rule",
  slug: "rule-inspire-current",
  title: "Deconstruct for inspiration",
  description:
    "Routes equipment for deconstruction to the highest-priority character who hasn't fully leveled the corresponding crafting skill. If the current character benefits, the item is deconstructed locally; otherwise it's routed via the bank.",
  goal: "temper-rule-goal/progress",
  conditions: "jsonl",
  destination: "character:by-priority",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/equipment",
  displayOrder: 45,
  action: "temper-item-action/deconstruct",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "temper-rule-template/inspire-current",
} as const satisfies TemperInventoryRule
