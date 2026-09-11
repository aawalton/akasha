import type { Module } from "../../../code-system/modules/module.page-type.types.ts"

export const parseLuaCapture = {
  id: "01a08e0c-2af7-7ac7-841c-ccaa3d4ee31b",
  pageTypeSlug: "module",
  slug: "parse-lua-capture",
  definition: "the text a Lua pattern capture holds, or nothing where it caught none",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A capture that matched nothing comes back as nil rather than as text.",
    },
  ],
} as const satisfies Module
