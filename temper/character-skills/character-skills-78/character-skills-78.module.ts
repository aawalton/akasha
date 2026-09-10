import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const characterSkills78 = {
  id: "01a06183-fa43-7ea0-a1f4-ed7615589e6f",
  pageTypeSlug: "module",
  slug: "character-skills-78",
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
