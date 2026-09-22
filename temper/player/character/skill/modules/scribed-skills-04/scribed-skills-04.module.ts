import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scribedSkills04 = {
  id: "01a0617c-86c3-7cb6-915d-6f17446091e0",
  type: "page-type/module",
  slug: "scribed-skills-04",
  definition: "a run of scribed skills, in the order the whole table names them",
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
    {
      decisionKind: "decision-kind/gap",
      statement: "An entry moved between runs breaks every build hash saved.",
    },
  ],
} as const satisfies Module
