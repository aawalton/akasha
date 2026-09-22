import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scribedSkillTypes = {
  id: "01a06187-b3a2-7407-b074-aff0b3d8c06d",
  type: "page-type/module",
  slug: "scribed-skill-types",
  definition: "the four choices that name a scribed skill a character has made",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A scribed skill choice names one grimoire and three scripts.",
    },
  ],
} as const satisfies Module
