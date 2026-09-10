import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionNextCharacter = {
  id: "01a0640c-1e9b-7780-ad52-95221a0c40d6",
  pageTypeSlug: "module",
  slug: "completion-next-character",
  definition: "which character a card of next-character scope falls to for its current turn",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The character picked is the first by sort order that has not finished the card.",
    },
    {
      invariantKind: "departure",
      statement: "A character naming no sort order is ordered last.",
    },
    {
      invariantKind: "departure",
      statement: "Two characters at one sort order are ordered by name.",
    },
    {
      invariantKind: "departure",
      statement: "An item path is judged by the card's item check rather than by its card check.",
    },
    {
      invariantKind: "departure",
      statement: "The pick is empty where the card is finished throughout the roster.",
    },
  ],
} as const satisfies Module
