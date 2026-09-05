import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleCompanionEpicNothing = {
  id: "01a0728b-10d1-750f-b02c-48d90d221ac4",
  pageTypeSlug: "temper-inventory-rule",
  slug: "rule-companion-epic-nothing",
  title: "Protect epic+ companion gear",
  description:
    "Prevents epic (purple) quality or higher companion equipment from being affected by lower-priority rules. Place above sell and deconstruct rules to safeguard your best companion gear.",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "companion",
  displayOrder: 12,
  action: "move-to",
  active: true,
  goal: "equip",
  locked: true,
  fromTemplate: "companion-epic-nothing",
  destination: "bank",
  conditions: "jsonl",
} as const satisfies TemperInventoryRule
