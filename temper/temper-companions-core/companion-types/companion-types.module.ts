import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionTypes = {
  id: "01a06119-5cae-707d-b341-15cffa09f8ac",
  pageTypeSlug: "module",
  slug: "companion-types",
  definition: "everything one saved companion build holds",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A build names an equipped piece by slot rather than by a list of pieces.",
    },
  ],
} as const satisfies Module
