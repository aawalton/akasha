import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const camelizeKey = {
  id: "01a090e5-14b5-76c8-a2aa-3fc1519a8db3",
  type: "module",
  slug: "camelize-key",
  definition: "a name rewritten as one word with a capital opening every word after the first",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A character that is no letter and no digit parts one word from the next.",
    },
    {
      invariantKind: "departure",
      statement: "The first word keeps its own capital lowered.",
    },
    {
      invariantKind: "absence",
      statement: "A name with no letter and no digit is rewritten as nothing.",
    },
  ],
} as const satisfies Module
