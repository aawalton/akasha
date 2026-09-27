import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useConditionValueOptions = {
  id: "01a0e275-3507-7e5b-844b-e63995de00df",
  type: "page-type/module",
  slug: "use-condition-value-options",
  definition: "the options of each condition field as a browser reads them from its value pages",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Until the pages are read there are no options rather than empty ones.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field's options are its value pages, in their display order.",
    },
  ],
} as const satisfies Module
