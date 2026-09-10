import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.types.ts"

export const ruleTrophiesBank = {
  id: "01a0728b-8ec1-75fa-80ed-81a19e273ed8",
  pageTypeSlug: "temper-inventory-rule",
  type: "temper-inventory-rule",
  slug: "rule-trophies-bank",
  title: "Bank trophies",
  description:
    "Deposits miscellaneous trophies (keys, key fragments, toys, dungeon buff ingredients, material upgraders) in the bank for safekeeping.",
  goal: "hoard",
  destination: "bank",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "trophies",
  displayOrder: 62,
  action: "move-to",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "trophies-bank",
} as const satisfies TemperInventoryRule
