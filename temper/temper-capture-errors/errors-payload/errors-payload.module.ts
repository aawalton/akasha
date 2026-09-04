import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const errorsPayload = {
  id: "01a0608a-15b2-7682-b22a-9bbc37158e7b",
  pageTypeSlug: "module",
  slug: "errors-payload",
  definition: "the shape a captured error takes, counted and blamed on the add-on that raised it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A repeat of an error raises a count rather than adding a second entry.",
    },
    {
      invariantKind: "departure",
      statement: "An entry carries the first time and the last time the error was seen.",
    },
    {
      invariantKind: "departure",
      statement: "An entry names the account and the character that saw the error.",
    },
    {
      invariantKind: "departure",
      statement: "An entry names the world the error was seen in.",
    },
    {
      invariantKind: "departure",
      statement: "An entry carries the game version and the API version that raised the error.",
    },
    {
      invariantKind: "departure",
      statement: "An entry names the add-on blamed for the error and the build of that add-on.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here holds code that runs.",
    },
  ],
} as const satisfies Module
