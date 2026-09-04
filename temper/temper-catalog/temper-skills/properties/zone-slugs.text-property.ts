import type { List } from "@akasha/pages-system/page-property"
import type { TextProperty } from "@akasha/pages-system/text-property"

export type ZoneSlug = string
export type ZoneSlugs = List<ZoneSlug>

export const zoneSlugs = {
  id: "01a05fca-cb88-7387-b51b-731bff669c39",
  pageTypeSlug: "text-property",
  slug: "zone-slugs",
  propertySlug: "zone-slugs",
  definition: "the zones a scribing source is worked in",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "gap",
      statement: "This property is a relation to a zone.",
    },
  ],
} as const satisfies TextProperty
