import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skillSlots = {
  id: "01a060db-b2bc-7435-a916-f751d5505338",
  pageTypeSlug: "module",
  slug: "skill-slots",
  definition: "the six places a skill sits in on one bar, five active and one ultimate",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the skill pages rather than by hand.",
    },
    {
      invariantKind: "constraint",
      statement: "A skill slot's place in this table is the index a build hash carries.",
    },
    {
      invariantKind: "gap",
      statement: "A skill slot moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module
