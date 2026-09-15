import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const currencyCatalogCapture = {
  id: "01a060e2-3184-7c0b-a09e-795eff7eebf3",
  type: "module",
  slug: "currency-catalog-capture",
  definition: "the game's currencies, read out of the client into the add-on's saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The collector adds itself to the catalog registry as the module loads.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A currency the client calls invalid is passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each currency carries whether the bank has that currency.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads how much of a currency the player has.",
    },
  ],
} as const satisfies Module
