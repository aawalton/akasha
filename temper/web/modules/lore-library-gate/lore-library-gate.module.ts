import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const loreLibraryGate = {
  id: "01a0e253-f855-7ce2-99e5-59b3cf0d1268",
  type: "page-type/module",
  slug: "lore-library-gate",
  definition: "what shows its content only once the lore library is read",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The content is handed the lore library, so nothing in it reads a library unread.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The content is drawn again whenever the lore library is read again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A screen starts reading the lore library as it opens, beside the reads of its other gates.",
    },
  ],
} as const satisfies Module
