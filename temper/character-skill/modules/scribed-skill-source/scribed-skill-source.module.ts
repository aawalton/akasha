import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scribedSkillSource = {
  id: "01a06187-b3a2-76d2-b668-400fec70d2e3",
  type: "module",
  slug: "scribed-skill-source",
  definition: "a scribed skill read out as a source the formula framework can take",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A scribed skill with no matching grimoire and focus answers nothing.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The effects a scribed skill grants are empty here.",
    },
  ],
} as const satisfies Module
