import type { Key } from "../../../things/properties/key.text-property.ts"
import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.types.ts"
import type { EsoClassId } from "../properties/eso-class-id.number-property.types.ts"

export type TemperClass = TemperCatalogThing & {
  key: Key
  esoClassId: EsoClassId
}
