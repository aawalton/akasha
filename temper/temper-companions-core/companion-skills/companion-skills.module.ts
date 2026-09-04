import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionSkills = {
  id: "01a06119-5caa-75f4-bbef-65ed8a22afa9",
  pageTypeSlug: "module",
  slug: "companion-skills",
  definition: "every skill a companion may put on its bar, gathered in one table",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This table is written out from the companion pages rather than by hand.",
    },
    {
      invariantKind: "constraint",
      statement: "A skill's place in this table is the index a build hash carries.",
    },
    {
      invariantKind: "gap",
      statement: "A skill moved to another place breaks every build hash saved.",
    },
    {
      invariantKind: "departure",
      statement: "This table is divided across runs.",
    },
    {
      invariantKind: "constraint",
      statement: "No akasha file passes fifteen thousand bytes.",
    },
  ],
} as const satisfies Module
