import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useCompanionCatalog = {
  id: "01a0de52-ecc3-7d27-995b-dd636d5d8cb3",
  type: "page-type/module",
  slug: "use-companion-catalog",
  definition:
    "the companion catalogue a screen reads from its pages, held while the screen is open",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A screen reads the companion pages only where it draws something they decide.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A companion page changing while a screen is open reaches it with no refresh.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read that fails is thrown to the screen rather than drawn as no companions.",
    },
  ],
} as const satisfies Module
