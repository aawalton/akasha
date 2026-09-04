import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const characterSkills29 = {
  id: "01a06182-7827-7a95-9cfc-e75c5b84e01b",
  pageTypeSlug: "module",
  slug: "character-skills-29",
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
