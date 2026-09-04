import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData063 = {
  id: "01a061a3-3083-7636-8340-4ed8f6530fdb",
  pageTypeSlug: "module",
  slug: "sets-data-063",
  definition: "part 063 of the gear set table, nobility-in-decay through nocturnals-ploy",
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
