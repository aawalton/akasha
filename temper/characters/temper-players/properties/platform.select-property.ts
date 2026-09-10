import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const platform = {
  id: "01a06e4f-b737-758d-9fe7-576149259344",
  pageTypeSlug: "select-property",
  type: "select-property",
  slug: "platform",
  propertySlug: "platform",
  definition: "the machine a player's account is played on",
  values: ["PC", "Xbox", "PlayStation"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The machines are named as The Elder Scrolls Online names those machines.",
    },
  ],
} as const satisfies SelectProperty

export type Platform = (typeof platform.values)[number]
