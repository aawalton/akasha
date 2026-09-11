import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const base64Url = {
  id: "01a08dda-ba3d-7b5a-9512-e8a36162fba1",
  pageTypeSlug: "module",
  type: "module",
  slug: "base64-url",
  definition: "bytes or text written in base64 over the URL alphabet, carrying no padding",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Text handed in is read as its UTF-8 bytes.",
    },
    {
      invariantKind: "departure",
      statement: "Plus becomes minus and slash becomes underscore.",
    },
    {
      invariantKind: "departure",
      statement: "The padding base64 ends in is struck.",
    },
  ],
} as const satisfies Module
