import type { Module } from "@akasha/code-system/module"

export const watcherSignedInUser = {
  id: "01a063aa-63c2-7558-845f-9e351ae7ba3f",
  pageTypeSlug: "module",
  slug: "watcher-signed-in-user",
  definition: "which user the watcher writes under, taken from the caller or from the session",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A user id the caller states is taken as given.",
    },
    {
      invariantKind: "departure",
      statement: "The session is asked only where the caller states no user id.",
    },
    {
      invariantKind: "departure",
      statement: "An answer carrying an error is refused.",
    },
    {
      invariantKind: "departure",
      statement: "An answer carrying no user is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the work that wanted a user.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal carries what the session said was wrong.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal that the session explained no further says the user was absent.",
    },
    {
      invariantKind: "constraint",
      statement: "The session is asked for the user id and for nothing else.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names the handler that asked.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies Module
