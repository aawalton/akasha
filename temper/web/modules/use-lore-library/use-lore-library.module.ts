import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useLoreLibrary = {
  id: "01a0e253-f856-7b2c-bdce-9b9eeb76e1d6",
  type: "page-type/module",
  slug: "use-lore-library",
  definition: "the lore library a screen reads from the lore pages, held while the screen is open",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A lore page changing while a screen is open reaches that screen with no refresh.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What needs the lore library is drawn only once the lore library is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read that fails is thrown to the screen rather than drawn as no books.",
    },
  ],
} as const satisfies Module
