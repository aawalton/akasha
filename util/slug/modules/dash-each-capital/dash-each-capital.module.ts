import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dashEachCapital = {
  id: "01a08e73-15cb-748d-bb35-86c2741dbde0",
  type: "page-type/module",
  slug: "dash-each-capital",
  definition: "a name rewritten with a dash before every capital it carries",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A capital opening the name takes a dash before it as any other capital does.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A run of capitals is dashed letter by letter rather than read as one word.",
    },
  ],
} as const satisfies Module
