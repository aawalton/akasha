import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const characterSkills44 = {
  id: "01a06183-fa39-702b-9f09-b4db081ee708",
  pageTypeSlug: "module",
  slug: "character-skills-44",
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
