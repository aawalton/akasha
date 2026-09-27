import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const passiveSkillsPanelCard = {
  id: "01a0642c-5ba6-754c-abac-523c83014b8e",
  type: "page-type/module",
  slug: "passive-skills-panel-card",
  definition: "a panel card with passive skills",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The passives are grouped again whenever the skill catalogue is read again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
} as const satisfies Module
