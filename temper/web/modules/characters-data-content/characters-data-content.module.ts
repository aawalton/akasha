import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersDataContent = {
  id: "01a0642c-5b8e-74d3-bd53-7a1a3bf7bf10",
  type: "page-type/module",
  slug: "characters-data-content",
  definition: "the data the characters page has",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A build naming the viewer's own account page is taken as the viewer's build.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Any other build keeps its account address as its owner.",
    },
  ],
} as const satisfies Module
