import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const useCompletion = {
  id: "01a06363-f687-70fb-8023-b311dc463a1b",
  pageTypeSlug: "module",
  slug: "use-completion",
  definition: "the completion a browser reads for one player",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "A query not naming `completion` under `files` answers that file's ending rather than its body.",
    },
    {
      invariantKind: "departure",
      statement: "A completion that is not an object reads here as no completion.",
    },
  ],
} as const satisfies Module
