import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setSourcesFilter = {
  id: "01a06276-e3e6-7c64-8c97-3ce008f60697",
  type: "module",
  slug: "set-sources-filter",
  definition: "the Set Sources condition a rule may carry, as the rule editor offers it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter reads and writes the `setSourceTypes` condition alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The set category representing no set is not offered.",
    },
  ],
} as const satisfies Module
