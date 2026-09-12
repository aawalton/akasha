import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const oneLine = {
  id: "01a095bb-4f52-7988-950f-f29155dd9bb0",
  type: "module",
  slug: "one-line",
  definition: "text with each run of whitespace closed up to one space and neither end holding any",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A break inside the text becomes one space.",
    },
    {
      invariantKind: "departure",
      statement: "Whitespace at either end goes.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here holds the text to a length.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reader outside `utils/` reaches this module by its path rather than by a package alias.",
    },
  ],
} as const satisfies Module
