import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleD5eaa312 = {
  id: "01a0728b-2e7c-76da-9bb6-376fb646b10a",
  pageTypeSlug: "temper-inventory-rule",
  type: "temper-inventory-rule",
  slug: "rule-d5eaa312",
  title: "Destroy unsellable low drinks",
  description:
    "Spine step 6: below-superior drink with no merchant value (event drinks) cannot fall to the sell rules - destroy. Companion to the raised drink sell floor (A5).",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "drink",
  displayOrder: 80,
  action: "destroy",
  active: true,
  updatedAt: "2026-07-05T13:32:43.468Z",
} as const satisfies TemperInventoryRule
