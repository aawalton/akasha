import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const stringsIn = {
  id: "01a09098-65cc-71fb-95a6-57732926c1c8",
  type: "module",
  slug: "strings-in",
  definition: "the strings a value holds, in the order that value holds them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value that is no array holds no strings.",
    },
    {
      invariantKind: "departure",
      statement: "An entry that is no string is dropped rather than refusing the whole value.",
    },
    {
      invariantKind: "departure",
      statement: "An empty string is an entry rather than read as nothing.",
    },
  ],
} as const satisfies Module
