import type { Module } from "@akasha/code-system/module"

export const watcherErrorCursor = {
  id: "01a06370-eddf-7cec-8d3e-f564adf6f360",
  pageTypeSlug: "module",
  slug: "watcher-error-cursor",
  definition: "the count last carried up for each game error, kept between runs of the watcher",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The cursor is kept beside the watcher log rather than in the game folder.",
    },
    {
      invariantKind: "departure",
      statement: "A cursor file that is not there reads as nothing carried up yet.",
    },
    {
      invariantKind: "departure",
      statement: "A cursor file that is no valid json reads as nothing carried up yet.",
    },
    {
      invariantKind: "departure",
      statement: "A cursor file of the wrong shape reads as nothing carried up yet.",
    },
    {
      invariantKind: "departure",
      statement: "A cursor is never partly read.",
    },
    {
      invariantKind: "departure",
      statement: "Saving makes the log directory where the directory is absent.",
    },
  ],
} as const satisfies Module
