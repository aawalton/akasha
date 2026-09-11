import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const stated = {
  id: "01a08e08-9bc5-777c-957f-47a336328803",
  pageTypeSlug: "module",
  type: "module",
  slug: "stated",
  definition: "text as it was written, or nothing where nothing was written",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Text written as nothing at all is nothing rather than empty text.",
    },
    {
      invariantKind: "departure",
      statement: "Text already nothing stays nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Text carrying a space is text, because a space was written.",
    },
  ],
} as const satisfies Module
