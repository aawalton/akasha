import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const textAt = {
  id: "01a05c94-2c02-7dc2-a598-544061815ac8",
  type: "module",
  slug: "text-at",
  definition: "the non-empty text a record holds under a key, or nothing",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A record that is not there holds no text under any key.",
    },
  ],
} as const satisfies Module
