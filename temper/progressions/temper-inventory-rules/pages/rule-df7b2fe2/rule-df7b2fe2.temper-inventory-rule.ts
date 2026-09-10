import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.types.ts"

export const ruleDf7b2fe2 = {
  id: "01a0728b-2e7d-7f3c-a66c-2fc91d9e5fc5",
  pageTypeSlug: "temper-inventory-rule",
  type: "temper-inventory-rule",
  slug: "rule-df7b2fe2",
  title: "List learned valuable style pages on guild store",
  description:
    "Lists style pages you cannot unlock (already known / wrong class) with guild-store value >= 5000g. Raised from 1000 to match the uniform 5000g list line.",
  goal: "sell",
  conditions: "jsonl",
  destination: "character:8796093022338107",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "style-pages",
  displayOrder: 29,
  action: "list",
  active: true,
  updatedAt: "2026-06-02T20:49:29.157Z",
} as const satisfies TemperInventoryRule
