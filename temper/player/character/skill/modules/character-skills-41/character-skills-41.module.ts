import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterSkills41 = {
  id: "01a06182-782d-7918-a3f2-8249c46fe889",
  type: "page-type/module",
  slug: "character-skills-41",
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
  ],
} as const satisfies Module
