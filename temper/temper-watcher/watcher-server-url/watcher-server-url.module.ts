import type { Module } from "@akasha/code-system/module"

export const watcherServerUrl = {
  id: "01a063c7-b010-7ea2-b91f-d479e832a8a3",
  pageTypeSlug: "module",
  slug: "watcher-server-url",
  definition: "how Alan signs the watcher in through a browser",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A callback whose state is not the state expected is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A callback missing either token is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A callback carrying no state is refused even where the expected state is empty.",
    },
    {
      invariantKind: "departure",
      statement: "A token that is an empty string is accepted rather than counted as missing.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal carries a page of html rather than a redirect.",
    },
    {
      invariantKind: "departure",
      statement: "An accepted callback carries a redirect rather than a page of html.",
    },
    {
      invariantKind: "departure",
      statement: "An accepted callback says nothing to the browser beyond where to go next.",
    },
    {
      invariantKind: "departure",
      statement:
        "The redirect after an accepted callback is built from the server address the caller named.",
    },
    {
      invariantKind: "departure",
      statement: "The local server answers the callback path alone.",
    },
    {
      invariantKind: "departure",
      statement: "The local server listens on the loopback address rather than on every address.",
    },
    {
      invariantKind: "departure",
      statement: "A sign-in state is sixteen random bytes written as hex.",
    },
    {
      invariantKind: "departure",
      statement: "Which command opens a sign-in link is handed in by the caller.",
    },
    {
      invariantKind: "departure",
      statement: "A caller naming no way to open a sign-in link has the link written to the log.",
    },
    {
      invariantKind: "gap",
      statement: "No module shared across akasha opens a link in a browser.",
    },
    {
      invariantKind: "departure",
      statement: "The server address is read from the environment at the call rather than at load.",
    },
    {
      invariantKind: "gap",
      statement:
        "An empty `TEMPER_SERVER_URL` is read as an empty address rather than as none set.",
    },
    {
      invariantKind: "departure",
      statement:
        "The timeout message counts its minutes off the timeout rather than naming a fixed number.",
    },
    {
      invariantKind: "departure",
      statement: "The timeout is dropped once a sign-in is accepted.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here starts a process.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the session that comes back to a file.",
    },
  ],
} as const satisfies Module
