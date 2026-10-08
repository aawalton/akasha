import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterSourceReading = {
  id: "01a0df67-9204-7695-8a2a-d5ec89b714b1",
  type: "page-type/module",
  slug: "character-source-reading",
  definition: "the character source pages held with the skill catalogue, and holding what they say",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One list names every character source page type held with the skill catalogue.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "These pages are read and held wherever the skill catalogue is.",
    },
  ],
  createdAt: "2026-09-26T20:28:21.892Z",
  updatedAt: "2026-09-27T01:09:54.000Z",
} as const satisfies Module
