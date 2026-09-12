import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const inventoryCharactersReading = {
  id: "01a068e2-2267-7365-a8e9-f53b7be80f20",
  type: "module",
  slug: "inventory-characters-reading",
  definition: "what each character knows, read out of the characters saved variables",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A character is named by the key the addon filed that character under.",
    },
    {
      invariantKind: "departure",
      statement: "The first account with characters answers and the rest go unread.",
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
      statement:
        "A scribing script counts as known only where the saved variables say that script is unlocked.",
    },
    {
      invariantKind: "departure",
      statement:
        "A skill line the saved variables hold with no current rank reads as being at rank zero.",
    },
    {
      invariantKind: "departure",
      statement: "A skill line the saved variables never name is absent rather than at rank zero.",
    },
    {
      invariantKind: "departure",
      statement: "A curse state that is neither vampire nor werewolf reads as no curse at all.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here talks to the game.",
    },
  ],
} as const satisfies Module
