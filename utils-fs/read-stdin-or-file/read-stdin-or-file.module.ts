import type { Module } from "../../code-system/modules/module.page-type.ts"

export const readStdinOrFile = {
  id: "01a069da-b9b3-7442-87a9-339906b70ec3",
  pageTypeSlug: "module",
  slug: "read-stdin-or-file",
  definition: "text read from a named file or from standard input",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path of one dash names standard input.",
    },
    {
      invariantKind: "departure",
      statement: "A file this cannot read raises an input error.",
    },
  ],
} as const satisfies Module
