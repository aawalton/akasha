import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.types.ts"

export const rule8f35e006 = {
  id: "01a0728a-f56e-7d26-a297-78f312730d8e",
  pageTypeSlug: "temper-inventory-rule",
  type: "temper-inventory-rule",
  slug: "rule-8f35e006",
  title: "Crown tri-pots stay banked",
  description:
    "Gap B1: bank is the deliberate stock home (2-3 chars at a time, manual pulls). Replaces the lock. Must run before f0ce7528.",
  conditions: "jsonl",
  destination: "bank",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "potions",
  displayOrder: 17,
  action: "move-to",
  active: true,
  updatedAt: "2026-07-05T13:20:46.391Z",
} as const satisfies TemperInventoryRule
