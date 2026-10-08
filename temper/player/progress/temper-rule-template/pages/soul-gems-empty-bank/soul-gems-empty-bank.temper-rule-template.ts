import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const soulGemsEmptyBank = {
  id: "019e3104-2619-7c16-a6af-1fd45755e988",
  type: "page-type/temper-rule-template",
  slug: "soul-gems-empty-bank",
  title: "Bank empty soul gems",
  key: "soul-gems-empty-bank",
  description:
    "Deposits empty (white quality) soul gems in the bank. Filled and crown soul gems are kept.",
  categoryId: "temper-item-category-tree/soul-gems",
  displayOrder: 23,
  action: "temper-item-action/move-to",
  active: false,
  goal: "temper-rule-goal/task",
  destination: "bank",
  conditions: "jsonl",
  createdAt: "2026-05-16T13:40:16.025Z",
  updatedAt: "2026-09-22T22:08:51.000Z",
} as const satisfies TemperRuleTemplate
