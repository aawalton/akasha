import type { List } from "@akasha/pages-system/page-property"
import type { RecordProperty } from "@akasha/pages-system/record-property"
import type { ReagentNames } from "./reagent-names.text-property.ts"

export type Recipe = {
  names: ReagentNames
}

export type Recipes = List<Recipe>

export const recipes = {
  id: "01a05fd1-d43d-7c95-8ac4-1739e09c409e",
  pageTypeSlug: "record-property",
  slug: "recipes",
  propertySlug: "reagents",
  definition: "the reagent sets a drink is brewed from, one set to an entry",
  properties: [{ pagePropertySlug: "reagent-names", required: true, many: true, max: null }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Any one of these sets brews the same drink.",
    },
  ],
} as const satisfies RecordProperty
