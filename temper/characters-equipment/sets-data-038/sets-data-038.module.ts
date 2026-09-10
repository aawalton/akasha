import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData038 = {
  id: "01a061a3-0132-7a3c-9e0b-6b8fc814c135",
  pageTypeSlug: "module",
  slug: "sets-data-038",
  definition: "part 038 of the gear set table, grisly-gourmet through hagravens-garden",
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
