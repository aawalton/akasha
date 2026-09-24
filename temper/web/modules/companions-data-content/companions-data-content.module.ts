import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionsDataContent = {
  id: "01a0642f-8c39-76f1-b933-f9088eb0ca06",
  type: "page-type/module",
  slug: "companions-data-content",
  definition: "what the companions data view draws",
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
    {
      decisionKind: "decision-kind/departure",
      statement: "A companion's progress page is found by the address of the companion's page.",
    },
  ],
} as const satisfies Module
