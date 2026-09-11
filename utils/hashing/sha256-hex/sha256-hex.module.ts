import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const sha256Hex = {
  id: "01a08ef4-823c-79ae-8b62-4de2fcf1a1b5",
  pageTypeSlug: "module",
  type: "module",
  slug: "sha256-hex",
  definition: "the sha256 of a body, written as lower-case hex",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A body is text or bytes.",
    },
    {
      invariantKind: "departure",
      statement: "Text is read as utf8.",
    },
    {
      invariantKind: "departure",
      statement: "The digest is the whole sixty-four characters.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a file.",
    },
  ],
} as const satisfies Module
