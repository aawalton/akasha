import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const isRecord = {
  id: "01a05c94-2bff-7114-b814-1a033bcfb5e8",
  type: "module",
  slug: "is-record",
  definition: "whether a value is an object that is neither null nor an array",
  code: "ts",
} as const satisfies Module
