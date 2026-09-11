import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const mapPinsFishingZones = {
  id: "01a06269-2ac8-7af2-8bbc-2ebe1c6b31e8",
  pageTypeSlug: "module",
  type: "module",
  slug: "map-pins-fishing-zones",
  definition: "the fishing zones and their fish",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
