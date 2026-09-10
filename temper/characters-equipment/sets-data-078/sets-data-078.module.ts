import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData078 = {
  id: "01a061a3-6216-77da-8d53-24e844978166",
  pageTypeSlug: "module",
  slug: "sets-data-078",
  definition: "part 078 of the gear set table, powerful-assault through queens-elegance",
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
