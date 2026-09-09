import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleMuseumPiecesNothing = {
  id: "01a0728b-4fbd-7048-8c55-e0eb6494b565",
  pageTypeSlug: "temper-inventory-rule",
  slug: "rule-museum-pieces-nothing",
  title: "Protect museum pieces",
  description:
    "Prevents museum pieces from being affected by lower-priority rules. These are turn-in items for collections or achievements.",
  goal: "task",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "museum-pieces",
  displayOrder: 52,
  action: "nothing",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "museum-pieces-nothing",
} as const satisfies TemperInventoryRule
