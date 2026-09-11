import type { TemperInventoryRule } from "akasha/temper/progressions/temper-inventory-rules/temper-inventory-rule.page-type.types.ts"

export const ruleCompanionEpicNothing = {
  id: "01a0728b-10d1-750f-b02c-48d90d221ac4",
  type: "temper-inventory-rule",
  slug: "rule-companion-epic-nothing",
  title: "Protect epic+ companion gear",
  description:
    "Prevents epic (purple) quality or higher companion equipment from being affected by lower-priority rules. Place above sell and deconstruct rules to safeguard your best companion gear.",
  goal: "equip",
  conditions: "jsonl",
  destination: "bank",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "companion",
  displayOrder: 12,
  action: "move-to",
  active: true,
  updatedAt: "2026-06-01T21:39:51.449Z",
  locked: true,
  fromTemplate: "companion-epic-nothing",
} as const satisfies TemperInventoryRule
