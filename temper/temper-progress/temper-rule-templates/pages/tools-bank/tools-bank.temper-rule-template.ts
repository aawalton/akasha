import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const toolsBank = {
  id: "019e3104-2620-7327-ad6d-ed207296369c",
  pageTypeSlug: "temper-rule-template",
  slug: "tools-bank",
  title: "Bank tools",
  key: "tools-bank",
  description: "Deposits tools (lockpicks, repair kits, etc.) in the bank for safekeeping.",
  categoryId: "tools",
  displayOrder: 31,
  action: "move-to",
  active: false,
  goal: "hoard",
  destination: "bank",
} as const satisfies TemperRuleTemplate
