import type { List } from "@akasha/pages/page-property"
import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type ValidSlot = string
export type ValidSlots = List<ValidSlot>

export const validSlots = {
  id: "01a05fcc-41f4-739e-a73e-ae1c6505faab",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "valid-slots",
  propertySlug: "valid-slots",
  definition: "the slots a piece of this kind goes into",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    { invariantKind: "gap", statement: "This property is a relation to a slot." },
    { invariantKind: "departure", statement: "One list has every slot a kind fits." },
  ],
} as const satisfies TextProperty
