import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const recordField = {
  id: "01a08e04-e54a-7ebc-acbf-ba372a5763fe",
  pageTypeSlug: "module",
  type: "module",
  slug: "record-field",
  definition: "what one field holds on a value that may be no record at all",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "A value that is no record holds no field.",
    },
  ],
} as const satisfies Module
