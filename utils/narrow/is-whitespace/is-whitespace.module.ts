import type { Module } from "../../../code-system/modules/module.page-type.types.ts"

export const isWhitespace = {
  id: "01a080db-00f0-784c-b0de-cdbaaca339dc",
  pageTypeSlug: "module",
  slug: "is-whitespace",
  definition: "whether a character is a space, a tab, a carriage return, or a newline",
  code: "ts",
} as const satisfies Module
