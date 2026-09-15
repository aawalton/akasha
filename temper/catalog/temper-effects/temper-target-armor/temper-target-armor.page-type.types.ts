import type { Armor } from "akasha/temper/catalog/temper-effects/temper-target-armor/properties/armor.number-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperTargetArmor = TemperCatalogThing & {
  key: Key
  armor: Armor
}
