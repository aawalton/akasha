import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleInspireStolen = {
  id: "01a0728b-4fbd-795a-8639-2dab20ad7664",
  type: "page-type/temper-inventory-rule",
  slug: "rule-inspire-stolen",
  title: "Launder stolen inspiration",
  description:
    "Launders stolen equipment that would give useful crafting inspiration, so it can be deconstructed. Place before other inspiration rules.",
  goal: "temper-rule-goal/progress",
  conditions: "jsonl",
  accountPage: "temper-account/alanarre",
  categoryId: "temper-item-category-tree/equipment",
  displayOrder: 51,
  action: "temper-item-action/fence-launder",
  active: true,
  ruleChangedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  createdAt: "2026-09-05T17:08:47.677Z",
  updatedAt: "2026-10-08T14:43:46.000Z",
} as const satisfies TemperInventoryRule
