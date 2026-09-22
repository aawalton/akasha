import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherToken = {
  id: "01a06377-d8cc-7fd4-a2aa-a8b1cc6f5c4e",
  type: "page-type/module",
  slug: "watcher-token",
  definition: "the watcher worker's enrolment token for the server",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The token reaches this process through the environment.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A token is the letters `wt_` followed by sixty-four hex characters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Space around the token is trimmed before the shape is judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A token of the wrong shape is refused rather than sent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An unset token is refused rather than treated as an empty token.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here mints a token.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A minted token would not match the hash the server verifies against.",
    },
  ],
} as const satisfies Module
