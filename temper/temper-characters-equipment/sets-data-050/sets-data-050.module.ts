import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData050 = {
  id: "01a061a3-307f-7c8a-805e-f57528f00845",
  pageTypeSlug: "module",
  slug: "sets-data-050",
  definition: "part 050 of the gear set table, kragh through kynes-wind",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The sets are named here in the order the gathered table answers its ids in.",
    },
    {
      invariantKind: "gap",
      statement: "A set moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module
