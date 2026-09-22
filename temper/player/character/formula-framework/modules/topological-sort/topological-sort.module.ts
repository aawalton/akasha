import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const topologicalSort = {
  id: "01a06070-82e5-713f-ac89-431606c70239",
  type: "page-type/module",
  slug: "topological-sort",
  definition: "an ordering putting every item after its own dependencies",
  code: "ts",
} as const satisfies Module
