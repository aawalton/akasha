import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData061 = {
  id: "01a061a3-3082-76ab-bee7-469bdf992f1a",
  pageTypeSlug: "module",
  slug: "sets-data-061",
  definition: "part 061 of the gear set table, new-moon-acolyte through night-mothers-gaze",
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
