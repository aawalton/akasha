import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const canCompanionEquipFilter = {
  id: "01a06100-3be3-7f9c-94ec-fd44ada789d8",
  type: "module",
  slug: "can-companion-equip-filter",
  definition: "the Can Companion Equip condition a rule may have, as the rule editor offers it",
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
