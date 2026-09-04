import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const topologicalSort = {
  id: "01a06070-82e5-713f-ac89-431606c70239",
  pageTypeSlug: "module",
  slug: "topological-sort",
  definition: "an ordering putting every item after the items that item depends on",
  code: "ts",
} as const satisfies Module
