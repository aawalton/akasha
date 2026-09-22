import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherPaths = {
  id: "01a06039-9c88-7c60-8a8b-7f8e09b0553a",
  type: "page-type/module",
  slug: "watcher-paths",
  definition: "the directories holding the temper watcher's log and state",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An environment variable naming a directory outright is taken over any other answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The log directory and the state directory are worked out apart.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Windows is answered from the directories Windows keeps such files in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other platform is answered from the XDG directories.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An unset home directory is refused rather than answered as the root.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here makes a directory.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a directory.",
    },
  ],
} as const satisfies Module
