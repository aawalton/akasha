import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const loreBookRendering = {
  id: "01a0d622-edc6-72ba-9e84-9cbc18fdb89e",
  type: "page-type/module",
  slug: "lore-book-rendering",
  definition: "the text of the lore book table modules, written as the formatter writes them",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A value is written the way the formatter would leave it, so a landing changes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part is closed before the entry that would carry it past its ceiling.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file or writes one.",
    },
  ],
} as const satisfies Module
