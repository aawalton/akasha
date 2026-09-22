import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const toolsBank = {
  id: "019e3104-2620-7327-ad6d-ed207296369c",
  type: "page-type/temper-rule-template",
  slug: "tools-bank",
  title: "Bank tools",
  key: "tools-bank",
  description: "Deposits tools (lockpicks, repair kits, etc.) in the bank for safekeeping.",
  categoryId: "temper-item-category-tree/tools",
  displayOrder: 32,
  action: "temper-item-action/move-to",
  active: false,
  goal: "temper-rule-goal/hoard",
  destination: "bank",
} as const satisfies TemperRuleTemplate
