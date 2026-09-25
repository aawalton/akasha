import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleCompanionEpicNothing = {
  id: "01a0728b-10d1-750f-b02c-48d90d221ac4",
  type: "page-type/temper-inventory-rule",
  slug: "rule-companion-epic-nothing",
  title: "Protect epic+ companion gear",
  description:
    "Prevents epic (purple) quality or higher companion equipment from being affected by lower-priority rules. Place above sell and deconstruct rules to safeguard your best companion gear.",
  goal: "temper-rule-goal/equip",
  conditions: "jsonl",
  destination: "bank",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/companion",
  displayOrder: 12,
  action: "temper-item-action/move-to",
  active: true,
  updatedAt: "2026-06-01T21:39:51.449Z",
  locked: true,
} as const satisfies TemperInventoryRule
