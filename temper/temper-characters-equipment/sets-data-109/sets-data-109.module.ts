import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData109 = {
  id: "01a061a3-982b-7a12-97e5-65b6b37b8aee",
  pageTypeSlug: "module",
  slug: "sets-data-109",
  definition: "part 109 of the gear set table, twilights-embrace through ulfnors-favor",
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
