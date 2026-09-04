import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const canCompanionEquipFilter = {
  id: "01a06100-3be3-7f9c-94ec-fd44ada789d8",
  pageTypeSlug: "module",
  slug: "can-companion-equip-filter",
  definition: "the Can Companion Equip condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This filter reads and writes the `canCompanionEquip` condition alone.",
    },
    {
      invariantKind: "departure",
      statement: "A category outside `equipment` is offered no Can Companion Equip condition.",
    },
  ],
} as const satisfies Module
