import type { Module } from "@akasha/code-system/module"

export const mappingGeneratorWrites = {
  id: "01a06837-d6c9-766c-840f-c3c60f7c9637",
  pageTypeSlug: "module",
  slug: "mapping-generator-writes",
  definition: "the write each mapping render lands as, taken from the one table naming the renders",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Which mappings are rendered is read from the render table rather than restated here.",
    },
    {
      invariantKind: "departure",
      statement: "A row names the file it renders whole rather than a stem a suffix is added to.",
    },
    {
      invariantKind: "departure",
      statement: "Every mapping render lands under one destination.",
    },
    {
      invariantKind: "departure",
      statement: "A render that throws names the file it was rendering rather than failing alone.",
    },
  ],
} as const satisfies Module
