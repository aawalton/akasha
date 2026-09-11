import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const esoCurseIds = {
  id: "01a05fc5-94cd-7c97-9330-6c78011127fa",
  type: "number-property",
  slug: "eso-curse-ids",
  propertySlug: "eso-curse-ids",
  definition: "the abilities The Elder Scrolls Online marks a curse by",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "One list has every ability the game marks one curse by.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
