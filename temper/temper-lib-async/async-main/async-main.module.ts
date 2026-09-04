import type { Module } from "@akasha/code-system/module"

export const asyncMain = {
  id: "01a0606a-1c55-7ece-9605-df5b14cabe22",
  pageTypeSlug: "module",
  slug: "async-main",
  definition: "the order the library parts are loaded in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The task class is loaded before any module adding a method to the task class.",
    },
    {
      invariantKind: "departure",
      statement: "The public name is published last.",
    },
  ],
} as const satisfies Module
