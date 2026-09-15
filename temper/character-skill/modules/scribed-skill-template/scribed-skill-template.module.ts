import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scribedSkillTemplate = {
  id: "01a0617c-86c1-77b2-9e1c-f729dd5bce09",
  type: "page-type/module",
  slug: "scribed-skill-template",
  definition: "the shape a scribed skill carries beyond an ordinary skill row",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A scribed skill names one grimoire and one focus script.",
    },
  ],
} as const satisfies Module
