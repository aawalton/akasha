import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterSkills64 = {
  id: "01a06183-fa3f-7e54-87b6-474c10ce28e8",
  type: "page-type/module",
  slug: "character-skills-64",
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
