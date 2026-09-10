import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionPeriodicFormula = {
  id: "01a06152-c2ce-7fc4-8e01-f2c9a0d80207",
  pageTypeSlug: "module",
  slug: "companion-periodic-formula",
  definition:
    "the tooltip number a periodic companion effect shows for a tick or for its whole run",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Tick counts are recomputed against the buff-augmented duration before the total is formed.",
    },
    { invariantKind: "constraint", statement: "A channeled effect drops one tick from its count." },
    {
      invariantKind: "constraint",
      statement: "Healing done is applied per tick unless the effect asks for the total.",
    },
  ],
} as const satisfies Module
