import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scribedSkills00 = {
  id: "01a0617c-86c1-7123-8fda-89d01108e8ed",
  type: "page-type/module",
  slug: "scribed-skills-00",
  definition: "a set of scribed skills, in the order the whole table names them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This table is written out from the skill pages rather than by hand.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "These entries are one unbroken run of the whole table's order.",
    },
  ],
} as const satisfies Module
