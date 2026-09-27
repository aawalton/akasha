import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useConditionFieldTitles = {
  id: "01a0e250-0a67-7222-815e-15306b5b5154",
  type: "page-type/module",
  slug: "use-condition-field-titles",
  definition: "the titles of the condition fields as a browser reads them, keyed by field",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Until the pages are read there are no titles rather than empty ones.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A condition field is found by the key a rule writes rather than by its slug.",
    },
  ],
} as const satisfies Module
