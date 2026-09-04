import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData060 = {
  id: "01a061a3-3082-73c9-b498-894bde4fd8f7",
  pageTypeSlug: "module",
  slug: "sets-data-060",
  definition: "part 060 of the gear set table, naga-shaman through netchs-touch",
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
