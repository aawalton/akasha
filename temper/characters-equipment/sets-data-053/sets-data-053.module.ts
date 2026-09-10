import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData053 = {
  id: "01a061a3-3080-7f8d-9dc4-f28670e955bd",
  pageTypeSlug: "module",
  slug: "sets-data-053",
  definition: "part 053 of the gear set table, leviathan through lucent-echoes",
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
