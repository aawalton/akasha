import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterSkills53 = {
  id: "01a06183-fa3c-7f7d-8734-87156e481c29",
  type: "page-type/module",
  slug: "character-skills-53",
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
