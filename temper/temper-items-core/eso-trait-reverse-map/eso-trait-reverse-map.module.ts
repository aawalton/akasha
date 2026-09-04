import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const esoTraitReverseMap = {
  id: "01a0612e-28d6-7df8-bb5c-419ce436eb8f",
  pageTypeSlug: "module",
  slug: "eso-trait-reverse-map",
  definition:
    "the temper trait id an ESO trait number means, for a player's gear or for a companion's",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An equip type the game numbers as jewelry is read against the jewelry maps alone.",
    },
    {
      invariantKind: "departure",
      statement: "A player trait map is read before a companion trait map.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here answers for an ESO trait number no map holds.",
    },
  ],
} as const satisfies Module
