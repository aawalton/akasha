import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const browseState = {
  id: "01a060a7-02f3-7e84-9e98-799da64c05e4",
  type: "module",
  slug: "browse-state",
  definition: "what to search next as each page of guild store listings arrives",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A guild whose pages are exhausted gives way to the next guild in the queue.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page is asked for only once the cooldown says the search may go.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A search already awaiting an answer blocks another search.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty queue finishes the search.",
    },
  ],
} as const satisfies Module
