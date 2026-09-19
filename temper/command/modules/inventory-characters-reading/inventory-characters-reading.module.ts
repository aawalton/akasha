import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryCharactersReading = {
  id: "01a068e2-2267-7365-a8e9-f53b7be80f20",
  type: "page-type/module",
  slug: "inventory-characters-reading",
  definition: "what each character knows, read out of the characters saved variables",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A character is named by the key the addon filed that character under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The first account with characters answers and the rest go unread.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lua list and a lua table of the same numbers read the same.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A motif book is placed by the lore table rather than by its own name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A scribing script counts as known only where the saved variables say that script is unlocked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A skill line the saved variables hold with no current rank reads as being at rank zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill line the saved variables never name is absent rather than at rank zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A curse state that is neither vampire nor werewolf reads as no curse at all.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A trait is named by the crafting type it is researched under and by its own name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A trait's name is lowered, because the name an item carries is cased its own way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A trait unresearched on any one line is unresearched for the crafting type.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here talks to the game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A scribing script is named by the item id of the book teaching it, found by its name.",
    },
  ],
} as const satisfies Module
