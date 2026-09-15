import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const padTwo = {
  id: "01a05c8b-6039-7947-8056-77c452128ce1",
  type: "module",
  slug: "pad-two",
  definition: "a number written to two characters, filled out with a leading zero",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here knows the thing the number this package fills out counts.",
    },
    {
      invariantKind: "departure",
      statement: "The width counts every character a number is written with.",
    },
    {
      invariantKind: "departure",
      statement: "The width is a contract rather than a courtesy.",
    },
    {
      invariantKind: "departure",
      statement:
        "A shorter answer breaks a caller that parses back the answer this package writes.",
    },
  ],
} as const satisfies Module
