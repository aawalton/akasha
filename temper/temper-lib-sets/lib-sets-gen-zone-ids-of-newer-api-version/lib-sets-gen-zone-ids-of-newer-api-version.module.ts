import type { Module } from "@akasha/code-system/module"

export const libSetsGenZoneIdsOfNewerApiVersion = {
  id: "01a061fc-cee8-7893-86a9-c6e36f1902df",
  pageTypeSlug: "module",
  slug: "lib-sets-gen-zone-ids-of-newer-api-version",
  definition: "the zone ids that exist only on a newer game API version",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This table is ported from the upstream library at a pinned commit.",
    },
    {
      invariantKind: "absence",
      statement: "The table is empty at the pinned commit.",
    },
  ],
} as const satisfies Module
