import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const fileSize = {
  id: "01a08182-0997-7171-8a4f-afaacaf31310",
  type: "module",
  slug: "file-size",
  definition: "how many bytes a file has, and none where no file is there",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path with no file is answered as no bytes.",
    },
    {
      invariantKind: "departure",
      statement: "A path with an entry that is no file is answered as no bytes.",
    },
    {
      invariantKind: "departure",
      statement: "A path is read as the caller spelled the path.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here throws.",
    },
  ],
} as const satisfies Module
