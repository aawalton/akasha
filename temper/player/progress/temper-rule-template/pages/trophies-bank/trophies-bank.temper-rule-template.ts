import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const trophiesBank = {
  id: "019e3104-2621-7ca2-8422-38d1ebaf66d8",
  type: "page-type/temper-rule-template",
  slug: "trophies-bank",
  title: "Bank trophies",
  key: "trophies-bank",
  description:
    "Deposits miscellaneous trophies (keys, key fragments, toys, dungeon buff ingredients, material upgraders) in the bank for safekeeping.",
  categoryId: "temper-item-category-tree/trophies",
  displayOrder: 34,
  action: "temper-item-action/move-to",
  active: false,
  goal: "temper-rule-goal/hoard",
  destination: "bank",
} as const satisfies TemperRuleTemplate
