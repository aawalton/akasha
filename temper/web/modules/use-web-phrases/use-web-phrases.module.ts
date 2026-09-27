import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useWebPhrases = {
  id: "01a0e299-ff83-76a2-adcc-651f5e891a77",
  type: "page-type/module",
  slug: "use-web-phrases",
  definition: "the web phrases as a browser reads them, with their names in braces filled",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Until the pages are read a phrase reads as nothing rather than as its key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug no phrase page carries is refused rather than shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A phrase is asked for by the slug of the page the screen imports.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A phrase's long wording is read from its description, whole.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A screen that reads a phrase redraws when that phrase's page changes.",
    },
  ],
} as const satisfies Module
