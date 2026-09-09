import type { List } from "@akasha/pages/page-property"
import type { TextProperty } from "@akasha/pages/text-property"

export type DropSource = string
export type DropSources = List<DropSource>

export const dropSources = {
  id: "01a05fd1-d439-7027-bdca-1804e14d6caf",
  pageTypeSlug: "text-property",
  slug: "drop-sources",
  propertySlug: "drop-sources",
  definition: "the daily errands a style's motif pages drop from",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    { invariantKind: "gap", statement: "This property is a relation to a scribing source." },
    { invariantKind: "departure", statement: "One list has every errand a style drops from." },
  ],
} as const satisfies TextProperty
