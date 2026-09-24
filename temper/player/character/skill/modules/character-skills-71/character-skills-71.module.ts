import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterSkills71 = {
  id: "01a06183-fa41-7793-8afc-89774305a305",
  type: "page-type/module",
  slug: "character-skills-71",
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
