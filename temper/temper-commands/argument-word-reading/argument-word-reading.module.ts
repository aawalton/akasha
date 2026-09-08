import type { Module } from "@akasha/code/module"

export const argumentWordReading = {
  id: "01a07c95-1051-774e-bcef-6c84d8c106fb",
  pageTypeSlug: "module",
  slug: "argument-word-reading",
  definition: "the values said after a flag and the words a call says as names",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A flag's values are the words said after each occurrence of that flag.",
    },
    {
      invariantKind: "departure",
      statement: "A flag said more than once answers with a value for each saying of that flag.",
    },
    {
      invariantKind: "departure",
      statement: "The values are answered in the order the call said those values.",
    },
    {
      invariantKind: "departure",
      statement: "A flag no word follows has no value.",
    },
    {
      invariantKind: "departure",
      statement: "A flag the call does not have answers with nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A name is a word opening with no dash.",
    },
    {
      invariantKind: "departure",
      statement:
        "The word after a flag that takes a value is passed over rather than read as a name.",
    },
    {
      invariantKind: "departure",
      statement: "Which flags take a value is the caller's to say.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here refuses a flag the command does not know.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says how many names a command takes.",
    },
  ],
} as const satisfies Module
