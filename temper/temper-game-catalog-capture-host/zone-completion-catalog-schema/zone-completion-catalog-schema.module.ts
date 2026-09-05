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
      statement: "A zone holds completion types that hold activities.",
    },
    {
      invariantKind: "departure",
      statement: "An activity carries an id of its own beside its name.",
    },
    {
      invariantKind: "departure",
      statement: "A completion type carries activities and nothing else.",
    },
  ],
} as const satisfies Module
