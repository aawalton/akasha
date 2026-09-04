import type { Module } from "@akasha/code-system/module"

export const inventoryCharactersReading = {
  id: "01a068e2-2267-7365-a8e9-f53b7be80f20",
  pageTypeSlug: "module",
  slug: "inventory-characters-reading",
  definition: "what each character knows, read out of the characters saved variables",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A character is named by the key the addon filed it under.",
    },
    {
      invariantKind: "departure",
      statement: "The first account carrying characters answers and the rest go unread.",
    },
    {
      invariantKind: "departure",
      statement: "A lua list and a lua table of the same numbers read the same.",
    },
    {
      invariantKind: "departure",
      statement: "A motif book is placed by the lore table rather than by its own name.",
    },
    {
      invariantKind: "departure",
      statement: "A scribing script counts as known only where it says it is unlocked.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here talks to the game.",
    },
  ],
} as const satisfies Module
