import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData066 = {
  id: "01a061a3-3084-7fab-8972-0bbee2e65550",
  pageTypeSlug: "module",
  slug: "sets-data-066",
  definition: "part 066 of the gear set table, orpheon-the-tactician through peace-and-serenity",
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
