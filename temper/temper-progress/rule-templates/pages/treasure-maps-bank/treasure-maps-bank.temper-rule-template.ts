import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const treasureMapsBank = {
  id: "019e3104-2618-7f6b-9442-fb9a11ef7939",
  pageTypeSlug: "temper-rule-template",
  slug: "treasure-maps-bank",
  title: "Bank treasure maps",
  key: "treasure-maps-bank",
  description:
    "Stashes treasure maps in the bank for later use. Treasure maps lead to chests with set gear.",
  categoryId: "treasure-maps",
  displayOrder: 22,
  action: "move-to",
  active: false,
  goal: "task",
  destination: "bank",
} as const satisfies TemperRuleTemplate
