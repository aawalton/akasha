import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const craftingCraftBag = {
  id: "019e3104-261e-7926-9502-ce21cea7fc4b",
  pageTypeSlug: "temper-rule-template",
  slug: "crafting-craft-bag",
  title: "Stow crafting materials",
  key: "crafting-craft-bag",
  description:
    "Moves crafting materials to the craft bag when visiting the bank. Requires ESO Plus or a craft bag entitlement. If you do not have ESO Plus, toggle off craft bag access in the ESO Plus panel above — the destination will be redirected to the bank automatically.",
  categoryId: "crafting",
  displayOrder: 29,
  action: "move-to",
  active: false,
  goal: "hoard",
  destination: "craft-bag",
} as const satisfies TemperRuleTemplate
