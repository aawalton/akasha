import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const buildHashBitReader = {
  id: "01a062c4-780e-7526-9fcb-b2c5285e9f51",
  pageTypeSlug: "module",
  slug: "build-hash-bit-reader",
  definition: "taking numbers back out of a byte array a chosen number of bits at a time",
  code: "ts",
} as const satisfies Module
