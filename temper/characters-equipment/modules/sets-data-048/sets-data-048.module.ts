import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsData048 = {
  id: "01a061a3-307e-7014-8d63-65f25e79cb0d",
  type: "module",
  slug: "sets-data-048",
  definition: "part 048 of the gear set table, jolting-arms through kargaeda",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The sets are named here in the order the gathered table answers its ids in.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A set moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module
