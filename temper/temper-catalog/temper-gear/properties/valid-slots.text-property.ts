import type { List } from "@akasha/pages-system/page-property"
import type { TextProperty } from "@akasha/pages-system/text-property"

export type ValidSlot = string
export type ValidSlots = List<ValidSlot>

export const validSlots = {
  id: "01a05fcc-41f4-739e-a73e-ae1c6505faab",
  pageTypeSlug: "text-property",
  slug: "valid-slots",
  propertySlug: "valid-slots",
  definition: "the slots a piece of this kind goes into",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    { invariantKind: "gap", statement: "This property is a relation to a slot." },
    { invariantKind: "departure", statement: "One list holds every slot a kind fits." },
  ],
} as const satisfies TextProperty
