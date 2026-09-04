import type { Module } from "@akasha/code-system/module"

export const quietLuaErrors = {
  id: "01a060f1-6926-7808-b998-73b9f56ae138",
  pageTypeSlug: "module",
  slug: "quiet-lua-errors",
  definition: "the Lua error notification the add-on hides",
  code: "ts",
} as const satisfies Module
