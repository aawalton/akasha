import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const seconds = {
  id: "01a08e0e-2679-7975-bc1c-012c263cbfd2",
  type: "module",
  slug: "seconds",
  definition: "a span of milliseconds written out as whole seconds",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A span is written to the nearest whole second.",
    },
    {
      invariantKind: "departure",
      statement: "The seconds are followed by an s and nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "A span under half a second is written as no seconds at all.",
    },
  ],
} as const satisfies Module
