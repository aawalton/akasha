import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const loreLibraryTypes = {
  id: "01a060c0-4132-7106-b60e-deafa6bfb1a2",
  pageTypeSlug: "module",
  slug: "lore-library-types",
  definition: "the shape of a lore library category, a collection inside it and a book inside that",
  code: "ts",
} as const satisfies Module
