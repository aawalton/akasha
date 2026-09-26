import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const foodOrDrinkKind = {
  id: "01a0df76-1665-7540-8374-0aa322d504ba",
  type: "page-type/text-property",
  slug: "food-or-drink-kind",
  propertySlug: "food-or-drink-kind",
  definition: "whether a consumable is eaten, drunk, or is the choice of neither",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The kind is `food`, `drink` or `none`.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
