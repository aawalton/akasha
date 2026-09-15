import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const savedSearch = {
  id: "01a0613a-e0a4-7b20-bccd-ee3321b608f2",
  type: "module",
  slug: "saved-search",
  definition: "a named, stored set of filter values that reloads into the filter bar",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A saved search carries version 1 so a later format change can be told apart.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A value with no matching filter in the registry index is dropped when a saved search is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Sort field and guild scope ride alongside the filter values in one saved search.",
    },
  ],
} as const satisfies Module
