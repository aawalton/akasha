import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const characterStateSchema = {
  id: "01a06279-228f-7f7c-aad1-a8a7f5ac918c",
  pageTypeSlug: "module",
  slug: "character-state-schema",
  definition: "the shape a zod validator names a character build must have",
  code: "ts",
} as const satisfies Module
