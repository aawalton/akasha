import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherState = {
  id: "01a0633f-8d1e-7be2-b34c-1ff9bbfe4907",
  type: "page-type/module",
  slug: "watcher-state",
  definition: "what the watcher remembers about each file it is watching",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every kind of file the watcher knows is remembered from the start.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every kind of file begins in the same state.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hash never recorded is null rather than an empty string.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each kind of file is remembered apart from every other kind.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here is kept on disk.",
    },
  ],
  createdAt: "2026-09-02T17:51:44.414Z",
  updatedAt: "2026-09-15T18:43:51.000Z",
} as const satisfies Module
