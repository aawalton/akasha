import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useImportErrorToast = {
  id: "01a0640f-8510-7768-9aee-350974e45eea",
  type: "page-type/module",
  slug: "use-import-error-toast",
  definition: "an import failure named in the query raised as a notice and then cleared",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A failure this build does not know is raised in general words.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The query is cleared without adding to the history.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice raised again under the same id replaces the notice showing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Its wording is read from web phrase pages, and no notice is raised before they are.",
    },
  ],
} as const satisfies Module
