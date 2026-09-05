import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleTreasuresEpicStolen = {
  id: "01a0728b-8ec0-725b-bf83-228a199a5876",
  pageTypeSlug: "temper-inventory-rule",
  slug: "rule-treasures-epic-stolen",
  title: "Launder epic+ treasures",
  description:
    "Launders stolen treasures of epic quality or higher. These are worth keeping — sell them legitimately or bank for later.",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "treasures",
  displayOrder: 58,
  action: "fence-launder",
  active: true,
  goal: "hoard",
  locked: true,
  fromTemplate: "treasures-epic-stolen",
  conditions: "jsonl",
} as const satisfies TemperInventoryRule
