import type { Description } from "akasha/page/properties/description.text-property.types.ts"
import type { Effects } from "akasha/temper/catalog/thing/properties/effects.page-property-entry.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperBuffMinor = TemperCatalogThing & {
  key: Key
  description: Description
  effects: Effects
}
