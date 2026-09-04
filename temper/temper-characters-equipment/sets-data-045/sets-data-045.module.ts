import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData045 = {
  id: "01a061a3-0134-72cd-b81a-08167b65434f",
  pageTypeSlug: "module",
  slug: "sets-data-045",
  definition: "part 045 of the gear set table, ilambris through impregnable-armor",
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
