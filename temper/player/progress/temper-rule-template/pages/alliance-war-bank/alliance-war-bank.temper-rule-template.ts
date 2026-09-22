import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const allianceWarBank = {
  id: "019e3104-2622-7aa4-88e8-9c5513f4f6e8",
  type: "page-type/temper-rule-template",
  slug: "alliance-war-bank",
  title: "Bank Alliance War items",
  key: "alliance-war-bank",
  description:
    "Deposits Alliance War items (siege equipment, forward camps, repair kits, etc.) in the bank for safekeeping.",
  categoryId: "temper-item-category-tree/alliance-war",
  displayOrder: 35,
  action: "temper-item-action/move-to",
  active: false,
  goal: "temper-rule-goal/hoard",
  destination: "bank",
} as const satisfies TemperRuleTemplate
