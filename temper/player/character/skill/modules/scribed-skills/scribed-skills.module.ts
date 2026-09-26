import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scribedSkills = {
  id: "01a0617c-86c3-714d-94b6-7c2e12d57a1a",
  type: "page-type/module",
  slug: "scribed-skills",
  definition: "every scribed skill made of a grimoire and a focus script",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The scribed skills are the held skill catalogue's, read whenever asked for.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A scribed skill's place among the scribed skills is the index a build hash has.",
    },
  ],
} as const satisfies Module
