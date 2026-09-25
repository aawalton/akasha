import type { TypeDeclaration } from "akasha/code/type-declaration/type-declaration.page-type.types.ts"

export const jsonlText = {
  id: "01a0d893-4998-7086-ab40-916c68b66324",
  type: "page-type/type-declaration",
  slug: "jsonl-text",
  definition: "the text an entry file is imported as",
  d: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry file is imported as its text, with the text import attribute.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The importer reads the rows from that text itself.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The browser's bundler reads an entry file as text only through its own plugin.",
    },
  ],
} as const satisfies TypeDeclaration
