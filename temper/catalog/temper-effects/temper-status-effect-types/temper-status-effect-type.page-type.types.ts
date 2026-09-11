import type { Key } from "../../../things/properties/key.text-property.types.ts"
import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.types.ts"

export type TemperStatusEffectType = TemperCatalogThing & {
  key: Key
}
