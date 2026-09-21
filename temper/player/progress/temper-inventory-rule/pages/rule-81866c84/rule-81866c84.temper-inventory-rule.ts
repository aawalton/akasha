import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const rule81866c84 = {
  id: "01a0c609-dc26-764b-9227-20d9dae9a377",
  type: "page-type/temper-inventory-rule",
  slug: "rule-81866c84",
  title: "Launder stolen equipment",
  description:
    "Launders stolen equipment that no higher-priority rule claimed, so it can be deconstructed. Place directly before equipment-deconstruct.",
  goal: "temper-rule-goal/hoard",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "equipment",
  displayOrder: 83,
  action: "temper-item-action/fence-launder",
  active: false,
  updatedAt: "2026-09-21T22:15:29.958Z",
} as const satisfies TemperInventoryRule
