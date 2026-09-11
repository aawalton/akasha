import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const libcMapping = {
  id: "01a0829f-d499-7794-b738-28a44c010e2e",
  pageTypeSlug: "module",
  slug: "libc-mapping",
  definition: "the C library this process has mapped, named by the path it was mapped from",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The C library is named by the object this process already has mapped.",
    },
    {
      invariantKind: "departure",
      statement: "A name a loader would search for names no library here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A mapping the loader has already deleted is named by the path that mapping came from.",
    },
    {
      invariantKind: "departure",
      statement: "A process with no C library mapped is refused rather than guessed at.",
    },
  ],
} as const satisfies Module
