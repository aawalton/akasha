import type { EsoClassId } from "akasha/temper/catalog/temper-skill/properties/eso-class-id.number-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/things/temper-catalog-thing.page-type.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"

export type TemperClass = TemperCatalogThing & {
  key: Key
  esoClassId: EsoClassId
}
