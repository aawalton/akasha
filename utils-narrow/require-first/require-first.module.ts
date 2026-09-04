import type { Module } from "../../code-system/modules/module.page-type.ts"

export const requireFirst = {
  id: "01a05c94-2c01-7905-8dca-e2fedf2cda07",
  pageTypeSlug: "module",
  slug: "require-first",
  definition: "the first element of an array, refused where the array is empty",
  code: "ts",
} as const satisfies Module
