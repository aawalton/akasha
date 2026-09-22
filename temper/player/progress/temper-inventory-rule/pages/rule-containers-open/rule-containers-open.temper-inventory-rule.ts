import type { TemperInventoryRule } from "akasha/temper/player/progress/temper-inventory-rule/temper-inventory-rule.page-type.types.ts"

export const ruleContainersOpen = {
  id: "01a0728b-10d1-7698-84e8-76571fa43054",
  type: "page-type/temper-inventory-rule",
  slug: "rule-containers-open",
  title: "Open containers",
  description:
    "Opens containers automatically. The Can Open filter skips containers on game cooldown or when transmute crystal storage is full. The Can Give Max Rewards filter skips containers during the 20-hour reward cooldown.",
  goal: "temper-rule-goal/use",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "temper-item-category-tree/containers",
  displayOrder: 11,
  action: "temper-item-action/open",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "temper-rule-template/containers-open",
} as const satisfies TemperInventoryRule
