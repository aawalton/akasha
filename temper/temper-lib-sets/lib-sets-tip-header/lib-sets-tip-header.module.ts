import type { Module } from "@akasha/code-system/module"

export const libSetsTipHeader = {
  id: "01a06231-8f1e-7766-8365-3c9678990800",
  pageTypeSlug: "module",
  slug: "lib-sets-tip-header",
  definition: "the localized labels and tooltip controls the rest of the tooltip code reads",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The custom pattern is a string of numbered placeholders between double angle brackets.",
    },
    {
      invariantKind: "departure",
      statement: "Which placeholders the pattern holds is remembered as flags in the shared state.",
    },
    {
      invariantKind: "constraint",
      statement: "A pattern with no numbered placeholder is not read as a custom tooltip.",
    },
  ],
} as const satisfies Module
