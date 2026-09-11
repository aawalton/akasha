import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const stripXmlComments = {
  id: "01a08de9-caf0-7416-9844-11646f6f4f04",
  type: "module",
  slug: "strip-xml-comments",
  definition: "markup with every comment blanked out and every line left where that line was",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A comment becomes blanks rather than going, so a position still names its place.",
    },
    {
      invariantKind: "departure",
      statement: "A newline inside a comment is kept, so a line number still names its line.",
    },
  ],
} as const satisfies Module
