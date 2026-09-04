import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData025 = {
  id: "01a061a3-012f-7939-b5ac-5bc5efbd21d4",
  pageTypeSlug: "module",
  slug: "sets-data-025",
  definition: "part 025 of the gear set table, diamonds-victory through dragonguard-elite",
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
