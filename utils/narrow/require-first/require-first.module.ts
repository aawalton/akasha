import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const requireFirst = {
  id: "01a05c94-2c01-7905-8dca-e2fedf2cda07",
  type: "module",
  slug: "require-first",
  definition: "the first element of an array, refused where the array is empty",
  code: "ts",
} as const satisfies Module
