import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData114 = {
  id: "01a061a3-982d-790c-8feb-63eff5fdfc9c",
  pageTypeSlug: "module",
  slug: "sets-data-114",
  definition: "part 114 of the gear set table, venomous-smite through vicecanon-of-venom",
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
