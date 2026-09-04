import type { Module } from "@akasha/code-system/module"

export const watcherRetry = {
  id: "01a0635b-79f7-7535-a528-c30b24b36eed",
  pageTypeSlug: "module",
  slug: "watcher-retry",
  definition: "how a saved-variables file the game still holds open is read or written anyway",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only a file the operating system reports as busy is tried again.",
    },
    {
      invariantKind: "departure",
      statement: "Anything else thrown reaches the caller on the first attempt.",
    },
    {
      invariantKind: "departure",
      statement: "Each attempt waits longer than the attempt before.",
    },
    {
      invariantKind: "departure",
      statement: "The final attempt throws rather than waiting again.",
    },
    {
      invariantKind: "departure",
      statement: "Waiting here blocks the worker rather than yielding to other work.",
    },
    {
      invariantKind: "departure",
      statement:
        "An atomic write is left to the file system package rather than written again here.",
    },
  ],
} as const satisfies Module
