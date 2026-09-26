import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillCatalogLoading = {
  id: "01a0de77-ea57-7d6d-a221-e5ec3e21af88",
  type: "page-type/module",
  slug: "skill-catalog-loading",
  definition: "the one read that fills the held skill catalogue from the skill pages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A catalogue already held is answered rather than read again.",
    },
  ],
} as const satisfies Module
