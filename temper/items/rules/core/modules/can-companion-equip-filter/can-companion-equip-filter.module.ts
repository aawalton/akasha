import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const canCompanionEquipFilter = {
  id: "01a06100-3be3-7f9c-94ec-fd44ada789d8",
  type: "page-type/module",
  slug: "can-companion-equip-filter",
  definition: "the Can Companion Equip condition a rule may have, as the rule editor offers it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter reads and writes the `canCompanionEquip` condition alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter is shown under its condition field page's title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter's options are its condition field's value pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A category outside `equipment` is offered no Can Companion Equip condition.",
    },
  ],
  createdAt: "2026-09-02T07:23:20.419Z",
  updatedAt: "2026-09-27T10:48:37.000Z",
} as const satisfies Module
