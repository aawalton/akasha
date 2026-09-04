import type { Module } from "@akasha/code-system/module"

export const asyncGlobal = {
  id: "01a0606a-1c55-7f79-8994-453c4b232ba0",
  pageTypeSlug: "module",
  slug: "async-global",
  definition: "the one global name the game and other addons reach the library by",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The library table is published under the addon name.",
    },
  ],
} as const satisfies Module
