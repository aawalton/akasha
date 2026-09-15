import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const textIn = {
  id: "01a08e33-143b-7941-8a84-9fab0085e396",
  type: "module",
  slug: "text-in",
  definition: "the non-empty text a value holds, or nothing",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value that is no text holds no text.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Text written as nothing at all is nothing rather than empty text.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Text carrying a space is text, because a space was written.",
    },
  ],
} as const satisfies Module
