import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const rule3f8c330f = {
  id: "01a0728a-d6ff-7440-9ba6-d96a6162ad73",
  pageTypeSlug: "temper-inventory-rule",
  slug: "rule-3f8c330f",
  title: "Full container stacks → Walton Mountain",
  description:
    "Full 200-stacks route to the Walton Mountain guild bank; the lower-priority Erin rule keeps the partial remainder (first-match-wins).",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "container-stackable",
  displayOrder: 7,
  action: "move-to",
  active: true,
  destination: "guild-bank:Walton Mountain",
  conditions: "jsonl",
} as const satisfies TemperInventoryRule
