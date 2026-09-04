import type { Module } from "@akasha/code-system/module"

export const watcherPaths = {
  id: "01a06039-9c88-7c60-8a8b-7f8e09b0553a",
  pageTypeSlug: "module",
  slug: "watcher-paths",
  definition: "the directories the temper watcher keeps its log and its state in",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An environment variable naming a directory outright is taken over any other answer.",
    },
    {
      invariantKind: "departure",
      statement: "The log directory and the state directory are worked out apart.",
    },
    {
      invariantKind: "departure",
      statement: "Windows is answered from the directories Windows keeps such files in.",
    },
    {
      invariantKind: "departure",
      statement: "Every other platform is answered from the XDG directories.",
    },
    {
      invariantKind: "departure",
      statement: "An unset home directory is refused rather than answered as the root.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here makes a directory.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a directory.",
    },
  ],
} as const satisfies Module
