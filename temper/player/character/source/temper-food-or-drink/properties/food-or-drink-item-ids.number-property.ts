import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const foodOrDrinkItemIds = {
  id: "01a15a06-9b6c-7bbe-8fe3-f5be4651eeb0",
  type: "page-type/number-property",
  slug: "food-or-drink-item-ids",
  propertySlug: "item-ids",
  definition: "the items whose buff a food or drink is",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The ids are read off the add-on's item mine.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-20T15:55:44.875Z",
  updatedAt: "2026-10-20T15:55:44.875Z",
} as const satisfies NumberProperty
