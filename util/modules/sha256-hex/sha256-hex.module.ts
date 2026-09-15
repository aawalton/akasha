import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sha256Hex = {
  id: "01a08ef4-823c-79ae-8b62-4de2fcf1a1b5",
  type: "module",
  slug: "sha256-hex",
  definition: "the sha256 of a body, written as lower-case hex",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "One module holds one digest rather than one module taking the digest's name.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A digest shortened or salted is that caller's rule rather than one here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body is text or bytes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Text is read as utf8.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The digest is the whole sixty-four characters.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here opens a file.",
    },
  ],
} as const satisfies Module
