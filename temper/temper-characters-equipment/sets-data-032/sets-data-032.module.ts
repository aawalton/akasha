import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData032 = {
  id: "01a061a3-0131-7ce7-85ba-4bebed422dc4",
  pageTypeSlug: "module",
  slug: "sets-data-032",
  definition: "part 032 of the gear set table, eyes-of-mara through fauns-lark-cladding",
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
