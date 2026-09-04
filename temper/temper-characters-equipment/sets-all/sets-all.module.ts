import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsAll = {
  id: "01a061a4-18b0-70f3-9811-f8f48f7e103b",
  pageTypeSlug: "module",
  slug: "sets-all",
  definition: "every gear set the game holds, gathered from the numbered parts into one table",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A set's place in this table is the index a build hash carries.",
    },
    {
      invariantKind: "constraint",
      statement: "The no-set sentinel is the first row this table answers.",
    },
    {
      invariantKind: "gap",
      statement: "A set moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module
