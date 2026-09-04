import type { Module } from "../../code-system/modules/module.page-type.ts"

export const readingChannel = {
  id: "01a0657e-795b-7000-9fd2-c341fb16005c",
  pageTypeSlug: "module",
  slug: "reading-channel",
  definition: "a reading written out as one anchored line, with its findings beside it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading's anchored line carries no line break.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reading's findings are written where a person reads rather than where a caller parses.",
    },
    {
      invariantKind: "departure",
      statement: "A finding naming no place reads as unattributed.",
    },
  ],
} as const satisfies Module
