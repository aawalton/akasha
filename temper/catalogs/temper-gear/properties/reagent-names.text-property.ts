import type { List } from "@akasha/pages/page-property"
import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type ReagentName = string
export type ReagentNames = List<ReagentName>

export const reagentNames = {
  id: "01a05fd1-d43d-7249-ac3e-8dcf8869e271",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "reagent-names",
  propertySlug: "names",
  definition: "the reagents one recipe is brewed from",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    { invariantKind: "gap", statement: "This property is a relation to a reagent." },
    { invariantKind: "departure", statement: "One list holds every reagent one recipe takes." },
  ],
} as const satisfies TextProperty
