import type { Module } from "../../code-system/modules/module.page-type.ts"

export const isRecord = {
  id: "01a05c94-2bff-7114-b814-1a033bcfb5e8",
  pageTypeSlug: "module",
  slug: "is-record",
  definition: "whether a value is an object that is neither null nor an array",
  code: "ts",
} as const satisfies Module
