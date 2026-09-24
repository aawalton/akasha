import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterSkills76 = {
  id: "01a06183-fa43-78f5-b8a0-a312d5d6f049",
  type: "page-type/module",
  slug: "character-skills-76",
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
