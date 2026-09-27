import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionSkillSelectDialog = {
  id: "01a0642f-8c32-7775-b161-276fc7d4c191",
  type: "page-type/module",
  slug: "companion-skill-select-dialog",
  definition: "the dialog for choosing a companion skill",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The skills offered are drawn again whenever the companion catalogue is read again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Its search and empty wording are web phrase pages; the no-skill name is the catalogue's.",
    },
  ],
} as const satisfies Module
