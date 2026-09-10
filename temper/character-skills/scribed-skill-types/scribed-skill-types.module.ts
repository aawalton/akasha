import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const scribedSkillTypes = {
  id: "01a06187-b3a2-7407-b074-aff0b3d8c06d",
  pageTypeSlug: "module",
  slug: "scribed-skill-types",
  definition: "the four choices that name one scribed skill a character has made",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A scribed skill choice names one grimoire and three scripts.",
    },
  ],
} as const satisfies Module
