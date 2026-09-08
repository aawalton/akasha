import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const zoneCompletionCatalogSchema = {
  id: "01a06076-5ea8-74db-9f0e-70749cf99a27",
  pageTypeSlug: "module",
  slug: "zone-completion-catalog-schema",
  definition: "the zod schema reading the zone completion catalog out of saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A zone has completion types that have activities.",
    },
    {
      invariantKind: "departure",
      statement: "An activity has an id of its own beside its name.",
    },
    {
      invariantKind: "departure",
      statement: "A completion type has activities and nothing else.",
    },
  ],
} as const satisfies Module
