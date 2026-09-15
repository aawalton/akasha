import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherFileType = {
  id: "01a0633f-8d1e-7d45-9db2-961a53ae61f6",
  type: "page-type/module",
  slug: "watcher-file-type",
  definition: "the kinds of saved-variables file the watcher carries across",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A kind is spelled in lower kebab case.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every kind the watcher knows is named in one list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The type of a kind is read off the list of kinds rather than written out beside the list.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says which file on disk a kind is read from.",
    },
  ],
} as const satisfies Module
