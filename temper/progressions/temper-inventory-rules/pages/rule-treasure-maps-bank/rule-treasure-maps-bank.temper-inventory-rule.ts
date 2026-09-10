import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.types.ts"

export const ruleTreasureMapsBank = {
  id: "01a0728b-8ebf-7ddd-8ba9-20cfde237207",
  pageTypeSlug: "temper-inventory-rule",
  type: "temper-inventory-rule",
  slug: "rule-treasure-maps-bank",
  title: "Bank treasure maps",
  description:
    "Stashes treasure maps in the bank for later use. Treasure maps lead to chests with set gear.",
  goal: "task",
  destination: "bank",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "treasure-maps",
  displayOrder: 50,
  action: "move-to",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "treasure-maps-bank",
} as const satisfies TemperInventoryRule
