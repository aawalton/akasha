import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const charactersKeyedMerge = {
  id: "01a062ea-5f64-7fa1-aa0a-0b08766288df",
  pageTypeSlug: "module",
  slug: "characters-keyed-merge",
  definition: "a stored map of numbered entries folded with a freshly read one, entry by entry",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "How a stored map of numbered entries takes a freshly read map is settled here.",
    },
  ],
} as const satisfies Module
