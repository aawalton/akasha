import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterSkills65 = {
  id: "01a06183-fa40-743a-8126-3c093fcf79a6",
  type: "module",
  slug: "character-skills-65",
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
