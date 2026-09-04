import type { Module } from "@akasha/code-system/module"

export const destinationsSharedDataIds = {
  id: "01a06269-29ee-7dd4-9b42-a7cf0a83ea00",
  pageTypeSlug: "module",
  slug: "destinations-shared-data-ids",
  definition: "the achievement and collectible ids the destination rows name",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
