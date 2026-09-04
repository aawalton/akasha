import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const scribedSkillSource = {
  id: "01a06187-b3a2-76d2-b668-400fec70d2e3",
  pageTypeSlug: "module",
  slug: "scribed-skill-source",
  definition: "a scribed skill read out as a source the formula framework can take",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A scribed skill with no matching grimoire and focus answers nothing.",
    },
    {
      invariantKind: "gap",
      statement: "The effects a scribed skill grants are empty here.",
    },
  ],
} as const satisfies Module
