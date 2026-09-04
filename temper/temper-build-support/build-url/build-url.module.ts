import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const buildUrl = {
  id: "01a0609f-53f9-74de-9c4c-1475434e5482",
  pageTypeSlug: "module",
  slug: "build-url",
  definition: "the link one character build or companion build is reached at",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A character build is linked under the `character-build` page type.",
    },
    {
      invariantKind: "departure",
      statement: "A companion build is linked under the `companion-build` page type.",
    },
    {
      invariantKind: "departure",
      statement: "A build link carries the build's own id.",
    },
    {
      invariantKind: "departure",
      statement: "A build link takes the readable part of the link from the build's name.",
    },
  ],
} as const satisfies Module
