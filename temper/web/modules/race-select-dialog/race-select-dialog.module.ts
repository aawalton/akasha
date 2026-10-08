import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const raceSelectDialog = {
  id: "01a0642c-5b81-7c38-b0c2-960dd7e2e29e",
  type: "page-type/module",
  slug: "race-select-dialog",
  definition: "the dialog selecting a race",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The races offered are drawn again whenever the skill catalogue is read again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The no-race choice is named by the no-race race page, read from the held catalog.",
    },
  ],
  createdAt: "2026-09-02T22:10:23.745Z",
  updatedAt: "2026-09-27T11:44:05.000Z",
} as const satisfies Module
