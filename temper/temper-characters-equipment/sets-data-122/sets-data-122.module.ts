import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData122 = {
  id: "01a061a4-18af-79b2-96c9-47cdea46c632",
  pageTypeSlug: "module",
  slug: "sets-data-122",
  definition: "part 122 of the gear set table, xanmeer-spellweaver through zaan",
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
