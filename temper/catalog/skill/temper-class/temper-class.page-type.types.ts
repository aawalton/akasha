import type { EsoClassId } from "akasha/temper/catalog/skill/temper-class/properties/eso-class-id.number-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperClass = TemperCatalogThing & {
  key: Key
  esoClassId: EsoClassId
}
