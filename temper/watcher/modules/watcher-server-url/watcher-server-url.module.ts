import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherServerUrl = {
  id: "01a063c7-b010-7ea2-b91f-d479e832a8a3",
  type: "page-type/module",
  slug: "watcher-server-url",
  definition: "the address of the temper server the watcher carries what it read across to",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The server address is read from the environment at the call rather than at load.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An environment naming no server address answers a default address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty `TEMPER_SERVER_URL` is read as no address set.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here signs anyone in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here starts a process.",
    },
  ],
} as const satisfies Module
