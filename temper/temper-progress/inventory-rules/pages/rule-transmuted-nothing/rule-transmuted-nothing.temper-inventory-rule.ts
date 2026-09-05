import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleTransmutedNothing = {
  id: "01a0728b-6d6f-78a2-8c9b-4d79e20601a6",
  pageTypeSlug: "temper-inventory-rule",
  slug: "rule-transmuted-nothing",
  title: "Protect transmuted gear",
  description:
    "Prevents transmuted equipment from being affected by lower-priority rules. Transmuted gear represents a transmute crystal investment.",
  goal: "equip",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "equipment",
  displayOrder: 25,
  action: "nothing",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "transmuted-nothing",
} as const satisfies TemperInventoryRule
