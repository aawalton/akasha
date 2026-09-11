import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const requireGet = {
  id: "01a05c94-2c01-7d4f-983a-9b980754af38",
  pageTypeSlug: "module",
  slug: "require-get",
  definition: "the value a map has under a key, refused where it has none",
  code: "ts",
} as const satisfies Module
