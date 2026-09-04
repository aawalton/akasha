import type { Module } from "@akasha/code-system/module"

export const zoneNamesData = {
  id: "01a061e7-9328-7c3a-ad08-a89ab3827af3",
  pageTypeSlug: "module",
  slug: "zone-names-data",
  definition: "every zone's name in each language the library carries",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each language holds the zone names of that language alone.",
    },
    {
      invariantKind: "departure",
      statement: "The Japanese and Polish fall back to English once the library loads.",
    },
  ],
} as const satisfies Module
