import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const setsData011 = {
  id: "01a0619f-59e7-723e-82ae-4decdc9c6fc4",
  type: "module",
  slug: "sets-data-011",
  definition: "part 011 of the gear set table, battalion-defender through belharzas-band",
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
