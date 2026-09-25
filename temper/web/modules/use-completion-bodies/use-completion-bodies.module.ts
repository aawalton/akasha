import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useCompletionBodies = {
  id: "01a076b9-598a-7c82-b905-b629a56a823f",
  type: "page-type/module",
  slug: "use-completion-bodies",
  definition: "the completion bodies a view asks for, keyed by the page each body is beside",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A body is asked for by the view that reads the body rather than held for every view.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A query naming `files` is the only query a body comes back on.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "`/ask` is a POST.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body arriving as its own ending is refused rather than read as no completion.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body is parsed with the schema the view hands in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body the schema refuses is an error rather than a completion.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The rows a listing draws are read apart from the bodies those rows have.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "One account's character bodies run to about six megabytes.",
    },
  ],
} as const satisfies Module
