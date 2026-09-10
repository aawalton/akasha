import type { TemperCatalogThing } from "../../../temper-catalog/things/temper-catalog-thing.page-type.types.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"
import type { Armor } from "../properties/armor.number-property.ts"

export type TemperTargetArmor = TemperCatalogThing & {
  key: Key
  armor: Armor
}
