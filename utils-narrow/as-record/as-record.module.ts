import type { Module } from "../../code-system/modules/module.page-type.ts"

export const asRecord = {
  id: "01a05c94-2bfb-7908-974d-2bd990ac9a56",
  pageTypeSlug: "module",
  slug: "as-record",
  definition: "a value read as a record of unknown values, or nothing where it is not one",
  code: "ts",
} as const satisfies Module
