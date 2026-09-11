import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const temperItemSets = {
  id: "01a090e4-78c9-7073-9166-03b462dd7c7e",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "temper-item-sets",
  definition: "the item set collections the game's client answers about",
  parts: ["module/item-set-categories"],
  invariants: [
    {
      invariantKind: "constraint",
      statement: "This code is compiled to Lua and runs inside the game.",
    },
  ],
} as const satisfies Domain
