import type { List } from "@akasha/pages/page-property"
import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"
import type { ReagentNames } from "./reagent-names.text-property.ts"

export type Recipe = {
  names: ReagentNames
}

export type Recipes = List<Recipe>

export const recipes = {
  id: "01a05fd1-d43d-7c95-8ac4-1739e09c409e",
  pageTypeSlug: "record-property",
  type: "record-property",
  slug: "recipes",
  propertySlug: "reagents",
  definition: "the reagent sets a drink is brewed from, one set to an entry",
  properties: [
    { pageProperty: "text-property/reagent-names", required: true, many: true, maxCount: null },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every reagent set brews the same drink.",
    },
  ],
} as const satisfies RecordProperty
