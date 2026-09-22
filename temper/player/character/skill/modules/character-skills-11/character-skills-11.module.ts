import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterSkills11 = {
  id: "01a06182-781e-7b6b-a663-d53ed3d8d881",
  type: "page-type/module",
  slug: "character-skills-11",
  definition: "a run of Elder Scrolls Online skills, in the order the whole table names them",
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
