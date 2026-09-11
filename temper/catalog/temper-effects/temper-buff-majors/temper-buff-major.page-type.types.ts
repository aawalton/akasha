import type { Description } from "akasha/pages/properties/description.text-property.ts"
import type { Effects } from "akasha/temper/catalog/things/properties/effects.page-property-entry.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/things/temper-catalog-thing.page-type.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"

export type TemperBuffMajor = TemperCatalogThing & {
  key: Key
  description: Description
  effects: Effects
}
