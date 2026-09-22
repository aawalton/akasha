import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterSkills40 = {
  id: "01a06182-782d-761d-b5c2-7a8b5783c329",
  type: "page-type/module",
  slug: "character-skills-40",
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
