import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const wholeWriting = {
  id: "01a09429-a77b-7673-8ae4-d384444c7b7a",
  type: "module",
  slug: "whole-writing",
  definition: "a run of bytes written to a destination until every byte of it is gone",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A write carrying part of the bytes is followed by a write of the bytes left over.",
    },
    {
      invariantKind: "departure",
      statement:
        "A destination refusing bytes for now is written to again rather than dropping the bytes left over.",
    },
    {
      invariantKind: "departure",
      statement:
        "A destination refusing bytes for any other reason raises rather than being written to again.",
    },
    {
      invariantKind: "absence",
      statement: "Writing sets no length on the destination beforehand.",
    },
    {
      invariantKind: "departure",
      statement: "A run of no bytes is written nowhere.",
    },
  ],
} as const satisfies Module
