import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buildCodecV52 = {
  id: "01a062e7-4dd0-7986-94bf-dbbb8f77aa09",
  type: "page-type/module",
  slug: "build-codec-v52",
  definition: "update fifty-two's bit layout for a whole character build",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A scribed skill is read from its grimoire and focus script, or its index where those name none.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A hash the add-on saved holds the lowest seven bits of a scribed skill's index among every skill.",
    },
  ],
} as const satisfies Module
