import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionWriterSchema = {
  id: "01a0607a-9cbc-744c-801a-ac572d86a811",
  pageTypeSlug: "module",
  slug: "completion-writer-schema",
  definition: "the zod shapes a completion capture is checked against",
  code: "ts",
} as const satisfies Module
