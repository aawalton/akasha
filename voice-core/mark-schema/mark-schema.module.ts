import type { Module } from "../../code-system/modules/module.page-type.ts"

export const markSchema = {
  id: "01a05b55-e06e-7c35-ae5b-23e9ba1006ae",
  pageTypeSlug: "module",
  slug: "mark-schema",
  definition: "the shape of a mark saying which sentence starts and how far into the audio it does",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A mark carrying a field the shape does not name is refused.",
    },
  ],
} as const satisfies Module
