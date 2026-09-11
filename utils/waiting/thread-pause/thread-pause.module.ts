import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const threadPause = {
  id: "01a08e0b-3619-7b50-b734-15e0787219e1",
  pageTypeSlug: "module",
  type: "module",
  slug: "thread-pause",
  definition: "the thread held still for a number of milliseconds",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The wait reaches no `Bun` global.",
    },
    {
      invariantKind: "departure",
      statement: "The thread is held rather than a later turn taken.",
    },
    {
      invariantKind: "absence",
      statement: "How long a caller waits in all is bounded by that caller.",
    },
  ],
} as const satisfies Module
