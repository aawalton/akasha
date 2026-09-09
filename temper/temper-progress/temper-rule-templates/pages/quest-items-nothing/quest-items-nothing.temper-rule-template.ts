import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const questItemsNothing = {
  id: "019e3104-261b-7569-b3d0-250b209440ea",
  pageTypeSlug: "temper-rule-template",
  slug: "quest-items-nothing",
  title: "Protect quest items",
  key: "quest-items-nothing",
  description:
    "Prevents quest-related items from being affected by lower-priority rules. Keep them safe until the associated quest is completed.",
  categoryId: "quest-items",
  displayOrder: 25,
  action: "nothing",
  active: false,
  goal: "task",
} as const satisfies TemperRuleTemplate
