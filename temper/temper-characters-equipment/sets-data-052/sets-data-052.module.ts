import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData052 = {
  id: "01a061a3-3080-7b8a-b3c0-dd2ccac6ef5b",
  pageTypeSlug: "module",
  slug: "sets-data-052",
  definition: "part 052 of the gear set table, law-of-julianos through lekis-focus",
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
