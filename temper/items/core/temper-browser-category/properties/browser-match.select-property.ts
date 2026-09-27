import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const browserMatch = {
  id: "01a0e11e-6894-7736-9eca-a8ee64798885",
  type: "page-type/select-property",
  slug: "browser-match",
  propertySlug: "match",
  definition: "how the item browser holds an item against a category's lists",
  values: [
    "All",
    "Stolen",
    "Weapons",
    "Armor",
    "Jewelry",
    "Companion",
    "Furnishing",
    "Consumable",
    "Materials",
    "Misc",
    "Appearance",
    "MiscSubfilter",
    "Specialized",
    "Junk",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A value is the name the browser's matcher reads a category's lists by.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
