import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData034 = {
  id: "01a061a3-0131-76a9-84e1-b32688953b94",
  pageTypeSlug: "module",
  slug: "sets-data-034",
  definition: "part 034 of the gear set table, foolkillers-ward through frostbite",
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
