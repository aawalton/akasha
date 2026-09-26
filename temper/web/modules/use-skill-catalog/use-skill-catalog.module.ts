import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useSkillCatalog = {
  id: "01a0de7a-2f36-70de-8356-060898814bf7",
  type: "page-type/module",
  slug: "use-skill-catalog",
  definition: "the skill catalogue a screen reads from the skill pages, held while it is open",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A skill page changing while a screen is open reaches that screen with no refresh.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read that fails is thrown to the screen rather than drawn as no skills.",
    },
  ],
} as const satisfies Module
