import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const dashEachCapital = {
  id: "01a08e73-15cb-748d-bb35-86c2741dbde0",
  type: "module",
  slug: "dash-each-capital",
  definition: "a name rewritten with a dash before every capital it carries",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A capital opening the name takes a dash before it as any other capital does.",
    },
    {
      invariantKind: "absence",
      statement: "A run of capitals is dashed letter by letter rather than read as one word.",
    },
  ],
} as const satisfies Module
