import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const platform = {
  id: "01a06e4f-b737-758d-9fe7-576149259344",
  type: "page-type/select-property",
  slug: "platform",
  propertySlug: "platform",
  definition: "the machine of a player's account",
  values: ["PC", "Xbox", "PlayStation"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The machines are named as The Elder Scrolls Online names those machines.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
