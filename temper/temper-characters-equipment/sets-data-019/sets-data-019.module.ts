import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData019 = {
  id: "01a0619f-59ec-72b1-99b8-f0339805e2ec",
  pageTypeSlug: "module",
  slug: "sets-data-019",
  definition: "part 019 of the gear set table, coup-de-gr-ce through crimson-oaths-rive",
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
