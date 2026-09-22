import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const versionActions = {
  id: "01a06589-8dc5-7000-8767-4f9e56617cf9",
  type: "page-type/module",
  slug: "version-actions",
  definition: "the saved versions of a character build, fetched from a browser",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer that does not narrow is refused rather than passed on part-read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A failure comes back as a message rather than as a raised error.",
    },
  ],
} as const satisfies Module
