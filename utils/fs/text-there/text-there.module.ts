import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const textThere = {
  id: "01a08e3b-5dd7-722f-9715-fa8d95ddd1b2",
  pageTypeSlug: "module",
  type: "module",
  slug: "text-there",
  definition: "the text a path holds, or nothing where the read threw for any reason",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A read that throws for any reason answers that no text is there.",
    },
    {
      invariantKind: "departure",
      statement: "A path holding no file and a path that would not open are one answer.",
    },
  ],
} as const satisfies Module
