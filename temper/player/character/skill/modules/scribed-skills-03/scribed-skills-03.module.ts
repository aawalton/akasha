import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scribedSkills03 = {
  id: "01a0617c-86c2-7e83-90bf-98b3d5e4f6eb",
  type: "page-type/module",
  slug: "scribed-skills-03",
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
