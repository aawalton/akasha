import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterSkills63 = {
  id: "01a06183-fa3f-74c8-9aee-0788e189bb8e",
  type: "page-type/module",
  slug: "character-skills-63",
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
