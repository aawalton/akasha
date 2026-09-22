import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterSkills02 = {
  id: "01a06182-781a-7fd3-a2e9-7faf720efdcc",
  type: "page-type/module",
  slug: "character-skills-02",
  definition: "a set of Elder Scrolls Online skills, in the order the whole table names them",
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
