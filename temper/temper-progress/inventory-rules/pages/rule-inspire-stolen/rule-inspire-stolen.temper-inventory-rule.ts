import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleInspireStolen = {
  id: "01a0728b-4fbd-795a-8639-2dab20ad7664",
  pageTypeSlug: "temper-inventory-rule",
  slug: "rule-inspire-stolen",
  title: "Launder stolen inspiration",
  description:
    "Launders stolen equipment that would give useful crafting inspiration, so it can be deconstructed. Place before other inspiration rules.",
  goal: "progress",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "equipment",
  displayOrder: 43,
  action: "fence-launder",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "inspire-stolen",
} as const satisfies TemperInventoryRule
