import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const rule26fb56ce = {
  id: "01a0728a-d6fe-7f39-a8dd-344d5c83df85",
  pageTypeSlug: "temper-inventory-rule",
  slug: "rule-26fb56ce",
  title: "Launder stolen lockpicks",
  description: "Launders stolen lockpicks so they can be banked or used instead of fence-sold.",
  goal: "hoard",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "lockpicks",
  displayOrder: 35,
  action: "fence-launder",
  active: true,
  updatedAt: "2026-05-31T18:39:21.682Z",
} as const satisfies TemperInventoryRule
