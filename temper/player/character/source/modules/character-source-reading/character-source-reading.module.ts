import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterSourceReading = {
  id: "01a0df67-9204-7695-8a2a-d5ec89b714b1",
  type: "page-type/module",
  slug: "character-source-reading",
  definition: "the character source pages a build hash reads by place, and holding what they say",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One list names every character source page type a build hash reads by place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "These pages are read and held wherever the skill catalogue is.",
    },
  ],
} as const satisfies Module
