import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterSkills42 = {
  id: "01a06182-782e-7bc9-adef-f53725cdedca",
  type: "page-type/module",
  slug: "character-skills-42",
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
