import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterSkills06 = {
  id: "01a06182-781c-7661-947c-e7634bcce790",
  type: "page-type/module",
  slug: "character-skills-06",
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
