import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const esoCloneStamp = {
  id: "01a06050-639f-76e4-94da-ea05355aa7da",
  type: "page-type/module",
  slug: "eso-clone-stamp",
  definition: "the marker a file generated from the game's source clone carries",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A generated file states the command that regenerates that file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A generated file states the API version its source clone was at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The clone's API version is read from the documentation's own header line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A regenerating command is written on one line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Documentation with no header line is refused rather than stamped from.",
    },
  ],
} as const satisfies Module
