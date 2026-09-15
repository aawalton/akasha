import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterSkills14 = {
  id: "01a06182-781f-7665-94b7-02d1da177fff",
  type: "module",
  slug: "character-skills-14",
  definition: "one run of Elder Scrolls Online skills, in the order the whole table names them",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "This table is written out from the skill pages rather than by hand.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "These entries are one unbroken run of the whole table's order.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "An entry moved between runs breaks every build hash saved.",
    },
  ],
} as const satisfies Module
