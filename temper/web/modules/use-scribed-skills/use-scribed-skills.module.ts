import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useScribedSkills = {
  id: "01a0642c-5ba4-74a9-a842-ea1f3845976c",
  type: "page-type/module",
  slug: "use-scribed-skills",
  definition: "the hook reading a character's scribed skills",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The scribed skills are worked out again whenever the skill catalogue is read again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
} as const satisfies Module
