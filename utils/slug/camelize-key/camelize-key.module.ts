import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const camelizeKey = {
  id: "01a090e5-14b5-76c8-a2aa-3fc1519a8db3",
  type: "module",
  slug: "camelize-key",
  definition: "a name rewritten as one word with a capital opening every word after the first",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The key this module is handed comes from outside akasha rather than from a page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A character that is no ascii letter and no ascii digit parts one word from the next.",
    },
    {
      invariantKind: "departure",
      statement: "A letter outside ascii parts words and is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "The first word keeps its own capital lowered.",
    },
    {
      invariantKind: "absence",
      statement: "A name with no ascii letter and no ascii digit is rewritten as nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here makes the name a page is exported under.",
    },
  ],
} as const satisfies Module
