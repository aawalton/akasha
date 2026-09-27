import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const heldLoreLibraryLoading = {
  id: "01a0e265-a2a9-7790-a868-5fe80de78328",
  type: "page-type/module",
  slug: "held-lore-library-loading",
  definition:
    "the lore pages read on the server as the lore library, and read again as they change",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The lore library is read the first time it is asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change to a lore category, collection or book page has it read again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Work over a checkout reads the lore library off that checkout's pages instead.",
    },
  ],
} as const satisfies Module
