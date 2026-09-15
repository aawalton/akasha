import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const scriptId = {
  id: "01a05fca-cb86-726d-9036-faa9f19d229d",
  type: "page-type/text-property",
  slug: "script-id",
  propertySlug: "script-id",
  definition: "the script an entry is about",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "invariant-kind/gap",
      statement: "This property is a relation to a script.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
