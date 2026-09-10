import type { Key } from "../../../things/properties/key.text-property.ts"
import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.types.ts"

export type TemperSpecialEffectType = TemperCatalogThing & {
  key: Key
}
