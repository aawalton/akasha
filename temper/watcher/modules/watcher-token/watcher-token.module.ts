import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherToken = {
  id: "01a06377-d8cc-7fd4-a2aa-a8b1cc6f5c4e",
  type: "module",
  slug: "watcher-token",
  definition: "the enrolment token the watcher worker proves itself to the server with",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The token reaches this process through the environment.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A token is the letters `wt_` followed by sixty-four hex characters.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Space around the token is trimmed before the shape is judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A token of the wrong shape is refused rather than sent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An unset token is refused rather than treated as an empty token.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here mints a token.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A minted token would not match the hash the server verifies against.",
    },
  ],
} as const satisfies Module
