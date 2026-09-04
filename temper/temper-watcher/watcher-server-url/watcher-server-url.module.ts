import type { Module } from "@akasha/code-system/module"

export const watcherServerUrl = {
  id: "01a063c7-b010-7ea2-b91f-d479e832a8a3",
  pageTypeSlug: "module",
  slug: "watcher-server-url",
  definition: "the address of the temper server the watcher carries what it read across to",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The server address is read from the environment at the call rather than at load.",
    },
    {
      invariantKind: "departure",
      statement: "An environment naming no server address answers a default address.",
    },
    {
      invariantKind: "gap",
      statement:
        "An empty `TEMPER_SERVER_URL` is read as an empty address rather than as none set.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here signs anyone in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here starts a process.",
    },
  ],
} as const satisfies Module
