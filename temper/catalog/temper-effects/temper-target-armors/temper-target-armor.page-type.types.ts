import type { Key } from "../../../things/properties/key.text-property.types.ts"
import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.types.ts"
import type { Armor } from "../properties/armor.number-property.types.ts"

export type TemperTargetArmor = TemperCatalogThing & {
  key: Key
  armor: Armor
}
