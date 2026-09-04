import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const bitReader = {
  id: "01a060b3-77ca-7b4f-a569-3dce9d9f75ad",
  pageTypeSlug: "module",
  slug: "bit-reader",
  definition: "taking numbers back out of a byte array a chosen number of bits at a time",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The bits come out from the most significant end.",
    },
    {
      invariantKind: "departure",
      statement: "A read reaching past the last byte gives back the bits already gathered.",
    },
    {
      invariantKind: "departure",
      statement: "How far the reading has got is kept in the reader.",
    },
  ],
} as const satisfies Module
