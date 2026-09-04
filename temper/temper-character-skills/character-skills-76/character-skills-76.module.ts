import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const characterSkills76 = {
  id: "01a06183-fa43-78f5-b8a0-a312d5d6f049",
  pageTypeSlug: "module",
  slug: "character-skills-76",
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
