import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const wholeWriting = {
  id: "01a09429-a77b-7673-8ae4-d384444c7b7a",
  type: "page-type/module",
  slug: "whole-writing",
  definition: "a run of bytes written to a destination until every byte of it is gone",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A write carrying part of the bytes is followed by a write of the bytes left over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A destination refusing bytes for now is written to again rather than dropping the bytes left over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A destination refusing bytes for any other reason raises rather than being written to again.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Writing sets no length on the destination beforehand.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run of no bytes is written nowhere.",
    },
  ],
} as const satisfies Module
