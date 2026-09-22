import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterSkills60 = {
  id: "01a06183-fa3e-7b92-afcf-8bfea930a2a3",
  type: "page-type/module",
  slug: "character-skills-60",
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
