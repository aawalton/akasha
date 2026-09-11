import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const isCallback = {
  id: "01a08e19-c569-71cc-8644-64f32991852e",
  pageTypeSlug: "module",
  slug: "is-callback",
  definition: "whether a value that may be a callback is one rather than a plain value",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Only Lua's own `type` tells a function from a value.",
    },
  ],
} as const satisfies Module
