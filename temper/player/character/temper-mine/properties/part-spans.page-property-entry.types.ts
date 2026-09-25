import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { PropertySlug } from "akasha/page/type/page-property/properties/property-slug.text-property.types.ts"
import type { FirstKey } from "akasha/temper/player/character/temper-mine/properties/first-key.number-property.types.ts"
import type { LastKey } from "akasha/temper/player/character/temper-mine/properties/last-key.number-property.types.ts"
import type { SpanPart } from "akasha/temper/player/character/temper-mine/properties/span-part.number-property.types.ts"

export type PartSpans = "jsonl"

export type PartSpansRow = {
  id: Id
  propertySlug: PropertySlug
  part: SpanPart
  firstKey: FirstKey
  lastKey: LastKey
}
