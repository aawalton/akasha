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
      statement: "This table is written out from the skill pages rather than by hand.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An entry's place in this table is the index a build hash has.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "An entry moved to another place breaks every build hash saved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This table is divided across runs.",
    },
  ],
} as const satisfies Module
