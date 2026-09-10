import type { TemperCatalogThing } from "../../../temper-catalog/things/temper-catalog-thing.page-type.types.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"
import type { EsoClassId } from "../properties/eso-class-id.number-property.ts"

export type TemperClass = TemperCatalogThing & {
  key: Key
  esoClassId: EsoClassId
}
