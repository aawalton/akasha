import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleTreasuresEpicBank = {
  id: "01a0728b-8ec0-751b-8b72-78d2913de4d2",
  pageTypeSlug: "temper-inventory-rule",
  slug: "rule-treasures-epic-bank",
  title: "Bank epic+ treasures",
  description: "Banks epic quality or higher treasures for safekeeping or later sale.",
  goal: "hoard",
  conditions: "jsonl",
  destination: "bank",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "treasures",
  displayOrder: 60,
  action: "move-to",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "treasures-epic-bank",
} as const satisfies TemperInventoryRule
