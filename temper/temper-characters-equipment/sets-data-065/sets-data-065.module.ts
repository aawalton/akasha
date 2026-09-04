import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData065 = {
  id: "01a061a3-3083-782e-a1f2-93172587c2ef",
  pageTypeSlug: "module",
  slug: "sets-data-065",
  definition: "part 065 of the gear set table, old-growth-brewer through orgnums-scales",
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
