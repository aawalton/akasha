import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const lorebooksLogger = {
  id: "01a06194-be42-7e85-b11d-e09499912e98",
  pageTypeSlug: "module",
  slug: "lorebooks-logger",
  definition: "writing the add-on's own debug lines where a log viewer can read them",
  code: "ts",
} as const satisfies Module
