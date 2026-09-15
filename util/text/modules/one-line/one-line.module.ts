import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const oneLine = {
  id: "01a095bb-4f52-7988-950f-f29155dd9bb0",
  type: "module",
  slug: "one-line",
  definition: "text with each run of whitespace closed up to one space and neither end holding any",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A break inside the text becomes one space.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whitespace at either end goes.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here holds the text to a length.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reader outside `utils/` reaches this module by its path rather than by a package alias.",
    },
  ],
} as const satisfies Module
