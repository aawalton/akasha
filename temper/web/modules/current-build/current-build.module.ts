import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const currentBuild = {
  id: "01a156f1-0e4e-7831-b34a-a31da4a00ac7",
  type: "page-type/module",
  slug: "current-build",
  definition: "the build a character or companion has now, read for its detail screen",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A character's current build is the build page its live build id names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A character naming no live build has the build hash of its newest reading as its current build.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading's age is the instant the reading was captured.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A build read from a reading is a live build nobody owns, under the character's id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A companion's current build is the build page its live build id names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A companion naming no live build has the hash its completion captured as its current build.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A companion's captured build is a live build nobody owns, under the companion's id.",
    },
  ],
  createdAt: "2026-10-20T01:33:20.846Z",
  updatedAt: "2026-10-20T01:34:48.259Z",
} as const satisfies Module
