import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData077 = {
  id: "01a061a3-6215-7b15-ab62-3e22a0ec8c01",
  pageTypeSlug: "module",
  slug: "sets-data-077",
  definition: "part 077 of the gear set table, pillar-of-nirn through poisonous-serpent",
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
