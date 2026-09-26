import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useSetCatalog = {
  id: "01a0de3d-b262-75f1-b48f-8c82016f6f74",
  type: "page-type/module",
  slug: "use-set-catalog",
  definition: "the set catalogue a screen reads from the set pages, held while the screen is open",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A screen reads the set pages only where it draws something a set decides.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set page changing while a screen is open reaches that screen with no refresh.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What needs the catalogue is drawn only once the catalogue is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Until then the screen draws what it is handed to draw in its place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read that fails is thrown to the screen rather than drawn as no sets.",
    },
  ],
} as const satisfies Module
