import type { Key } from "../../../things/properties/key.text-property.ts"
import type { EsoClassId } from "../../temper-skills/properties/eso-class-id.number-property.ts"
import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.types.ts"

export type TemperClass = TemperCatalogThing & {
  key: Key
  esoClassId: EsoClassId
}
