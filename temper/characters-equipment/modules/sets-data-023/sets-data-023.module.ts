import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const setsData023 = {
  id: "01a061a3-012e-757f-b157-876603c46e8b",
  type: "module",
  slug: "sets-data-023",
  definition: "part 023 of the gear set table, deadly-strike through deeproot-zeal",
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
