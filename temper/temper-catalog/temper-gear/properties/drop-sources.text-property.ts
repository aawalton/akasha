import type { List } from "@akasha/pages-system/page-property"
import type { TextProperty } from "@akasha/pages-system/text-property"

export type DropSource = string
export type DropSources = List<DropSource>

export const dropSources = {
  id: "01a05fd1-d439-7027-bdca-1804e14d6caf",
  pageTypeSlug: "text-property",
  slug: "drop-sources",
  propertySlug: "drop-sources",
  definition: "the daily errands a style's motif pages drop from",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    { invariantKind: "gap", statement: "This property is a relation to a scribing source." },
    { invariantKind: "departure", statement: "One list holds every errand a style drops from." },
  ],
} as const satisfies TextProperty
