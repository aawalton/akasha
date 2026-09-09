import type { Module } from "@akasha/code/module"

export const useCompletionBodies = {
  id: "01a076b9-598a-7c82-b905-b629a56a823f",
  pageTypeSlug: "module",
  slug: "use-completion-bodies",
  definition: "the completion bodies one view asks for, keyed by the page each body is beside",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A body is asked for by the view that reads the body rather than held for every view.",
    },
    {
      invariantKind: "departure",
      statement: "A query naming `files` is the only query a body comes back on.",
    },
    {
      invariantKind: "constraint",
      statement: "`/ask` is a POST.",
    },
    {
      invariantKind: "departure",
      statement: "A body arriving as its own ending is refused rather than read as no completion.",
    },
    {
      invariantKind: "departure",
      statement: "The rows a listing draws are read apart from the bodies those rows have.",
    },
    {
      invariantKind: "constraint",
      statement: "One account's character bodies run to about six megabytes.",
    },
  ],
} as const satisfies Module
