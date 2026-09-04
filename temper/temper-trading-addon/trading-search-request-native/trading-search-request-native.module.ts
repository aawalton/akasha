import type { Module } from "@akasha/code-system/module"

export const tradingSearchRequestNative = {
  id: "01a06160-2a5c-7131-9d9b-e1b27ea4e7cd",
  pageTypeSlug: "module",
  slug: "trading-search-request-native",
  definition: "handing a collected filter set to the game's own guild store search",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The game's own search does the narrowing the filters ask for.",
    },
  ],
} as const satisfies Module
