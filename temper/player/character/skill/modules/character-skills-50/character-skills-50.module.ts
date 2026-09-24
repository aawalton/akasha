import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterSkills50 = {
  id: "01a06183-fa3b-73aa-b6b3-c61d5a29052b",
  type: "page-type/module",
  slug: "character-skills-50",
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
