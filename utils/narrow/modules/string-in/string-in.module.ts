import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const stringIn = {
  id: "01a08e46-4a99-7249-b10c-2177c0d3079d",
  type: "module",
  slug: "string-in",
  definition: "the string a value holds, or nothing",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value that is no string holds no string.",
    },
    {
      invariantKind: "departure",
      statement: "An empty string is answered rather than read as nothing.",
    },
  ],
} as const satisfies Module
