import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const alliances = {
  id: "01a060ea-ac5c-7ddc-8beb-424cc85a9621",
  pageTypeSlug: "module",
  slug: "alliances",
  definition: "the three alliances a character fights for, and no alliance at all",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the character pages rather than by hand.",
    },
    {
      invariantKind: "constraint",
      statement: "A alliance's place in this table is the index a build hash carries.",
    },
    {
      invariantKind: "gap",
      statement: "A alliance moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module
