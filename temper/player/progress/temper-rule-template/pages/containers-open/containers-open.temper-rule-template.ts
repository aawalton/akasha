import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const containersOpen = {
  id: "019e3104-2608-73dd-9d1c-a7890d444f99",
  type: "page-type/temper-rule-template",
  slug: "containers-open",
  title: "Open containers",
  key: "containers-open",
  description:
    "Opens containers automatically. The Can Open filter skips containers on game cooldown or when transmute crystal storage is full. The Can Give Max Rewards filter skips containers during the 20-hour reward cooldown.",
  categoryId: "temper-item-category-tree/containers",
  displayOrder: 3,
  action: "temper-item-action/open",
  active: false,
  goal: "temper-rule-goal/use",
  conditions: "jsonl",
  createdAt: "2026-05-16T13:40:16.008Z",
  updatedAt: "2026-09-22T22:08:51.000Z",
} as const satisfies TemperRuleTemplate
