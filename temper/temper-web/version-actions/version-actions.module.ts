import type { Module } from "@akasha/code-system/module"

export const versionActions = {
  id: "01a06589-8dc5-7000-8767-4f9e56617cf9",
  pageTypeSlug: "module",
  slug: "version-actions",
  definition: "the saved versions of one character build, fetched from a browser",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An answer that does not narrow is refused rather than passed on part-read.",
    },
    {
      invariantKind: "departure",
      statement: "A failure comes back as a message rather than as a raised error.",
    },
  ],
} as const satisfies Module
