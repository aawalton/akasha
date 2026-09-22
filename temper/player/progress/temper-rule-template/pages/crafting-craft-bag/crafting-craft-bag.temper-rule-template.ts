import type { TemperRuleTemplate } from "akasha/temper/player/progress/temper-rule-template/temper-rule-template.page-type.types.ts"

export const craftingCraftBag = {
  id: "019e3104-261e-7926-9502-ce21cea7fc4b",
  type: "page-type/temper-rule-template",
  slug: "crafting-craft-bag",
  title: "Stow crafting materials",
  key: "crafting-craft-bag",
  description:
    "Moves crafting materials to the craft bag when visiting the bank. Requires ESO Plus or a craft bag entitlement. If you do not have ESO Plus, toggle off craft bag access in the ESO Plus panel above — the destination will be redirected to the bank automatically.",
  categoryId: "temper-item-category-tree/crafting",
  displayOrder: 30,
  action: "temper-item-action/move-to",
  active: false,
  goal: "temper-rule-goal/hoard",
  destination: "craft-bag",
} as const satisfies TemperRuleTemplate
