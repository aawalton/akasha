import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const wornDestinationResolve = {
  id: "01a19875-35c8-7ad5-85e2-4b3bfccb3c67",
  type: "page-type/module",
  slug: "worn-destination-resolve",
  definition: "the character or companion gear a build wants resolves to",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Gear for the build a character is set up as resolves to that character's worn bag.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Gear for another of its target builds is moved to that character instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item in a backpack names the character playing as the one holding it.",
    },
  ],
  createdAt: "2026-11-01T18:53:00.743Z",
  updatedAt: "2026-11-01T18:53:00.743Z",
} as const satisfies Module
