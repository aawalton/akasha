import type { Module } from "@akasha/code-system/module"

export const watcherState = {
  id: "01a0633f-8d1e-7be2-b34c-1ff9bbfe4907",
  pageTypeSlug: "module",
  slug: "watcher-state",
  definition: "what the watcher remembers about each file it is watching",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every kind of file the watcher knows is remembered from the start.",
    },
    {
      invariantKind: "departure",
      statement: "Every kind of file begins in the same state.",
    },
    {
      invariantKind: "departure",
      statement: "A hash never recorded is null rather than an empty string.",
    },
    {
      invariantKind: "departure",
      statement: "Each kind of file is remembered apart from every other kind.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here is kept on disk.",
    },
  ],
} as const satisfies Module
