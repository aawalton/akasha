import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData085 = {
  id: "01a061a3-6217-7ae6-8862-eeaca8911b76",
  pageTypeSlug: "module",
  slug: "sets-data-085",
  definition: "part 085 of the gear set table, saxhleel-champion through sea-serpents-coil",
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
