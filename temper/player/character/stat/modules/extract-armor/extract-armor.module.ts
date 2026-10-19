import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const extractArmor = {
  id: "01a06271-abcf-73d3-9f27-e843cae7cf5f",
  type: "page-type/module",
  slug: "extract-armor",
  definition: "the armor a build wears on a bar, read out as effect sources",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The armor Divines counts is the seven body pieces and the active bar's shield.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A shield gives no effect source of its own.",
    },
  ],
  createdAt: "2026-09-02T14:06:51.855Z",
  updatedAt: "2026-10-19T21:52:10.849Z",
} as const satisfies Module
