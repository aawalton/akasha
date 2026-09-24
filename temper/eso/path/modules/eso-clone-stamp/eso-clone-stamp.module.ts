import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const esoCloneStamp = {
  id: "01a06050-639f-76e4-94da-ea05355aa7da",
  type: "page-type/module",
  slug: "eso-clone-stamp",
  definition: "the API version the game's source clone is at",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The clone's API version is read from the documentation's own header line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Documentation with no header line is refused rather than stamped from.",
    },
  ],
} as const satisfies Module
