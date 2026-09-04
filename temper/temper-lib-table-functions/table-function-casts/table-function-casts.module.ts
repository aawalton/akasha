import type { Module } from "@akasha/code-system/module"

export const tableFunctionCasts = {
  id: "01a06052-2ca5-78e3-9cd6-62ac3cdd5bed",
  pageTypeSlug: "module",
  slug: "table-function-casts",
  definition: "what an unknown handed to a table helper is read as",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A helper takes an unknown so a caller in Lua may hand in anything.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here checks a value at run time.",
    },
  ],
} as const satisfies Module
