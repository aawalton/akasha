import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const reagentNames = {
  id: "01a05fd1-d43d-7249-ac3e-8dcf8869e271",
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
  types: "ts",
} as const satisfies TextProperty
