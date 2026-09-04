import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const championPointSource = {
  id: "01a06076-1b65-7228-8994-fbce92968c6f",
  pageTypeSlug: "module",
  slug: "champion-point-source",
  definition: "every champion star a character can earn, gathered into one table",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A champion star's place in this table is the index a build hash carries.",
    },
    {
      invariantKind: "gap",
      statement: "A champion star moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module
