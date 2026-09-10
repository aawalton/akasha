import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const characterSkills61 = {
  id: "01a06183-fa3e-70e7-b9c1-d06506153a1f",
  pageTypeSlug: "module",
  slug: "character-skills-61",
  definition: "one run of Elder Scrolls Online skills, in the order the whole table names them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This table is written out from the skill pages rather than by hand.",
    },
    {
      invariantKind: "constraint",
      statement: "These entries are one unbroken run of the whole table's order.",
    },
    {
      invariantKind: "gap",
      statement: "An entry moved between runs breaks every build hash saved.",
    },
  ],
} as const satisfies Module
