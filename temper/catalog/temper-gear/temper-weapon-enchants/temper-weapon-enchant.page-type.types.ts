import type { EsoEnchantConstantName } from "akasha/temper/catalog/temper-gear/properties/eso-enchant-constant-name.text-property.types.ts"
import type { TemperGearThing } from "akasha/temper/catalog/temper-gear/things/temper-gear-thing.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/things/properties/display-order.number-property.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"

export type TemperWeaponEnchant = TemperGearThing & {
  key: Key
  displayOrder: DisplayOrder
  esoEnchantConstantName: EsoEnchantConstantName
}
