import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleSoulGemsEmptyFill = {
  id: "01a0728b-6d6f-7226-88d1-5d7267781a0e",
  type: "page-type/temper-inventory-rule",
  slug: "rule-soul-gems-empty-fill",
  title: "Fill empty soul gems on Belavierr",
  description:
    "Sends every empty (white quality) soul gem to Belavierr, who fills them by Soul Trap in the field. The filled gems Belavierr holds past his own 200 go to the bank, from which every other character is stocked to 200. Crown soul gems are left as they are.",
  goal: "temper-rule-goal/task",
  conditions: "jsonl",
  destination: "character:8796093063486895",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/soul-gems",
  displayOrder: 59,
  action: "temper-item-action/fill",
  active: true,
  ruleChangedAt: "2026-10-28T18:50:00.000Z",
  locked: true,
  createdAt: "2026-09-05T17:08:55.279Z",
  updatedAt: "2026-10-28T18:35:05.561Z",
} as const satisfies TemperInventoryRule
