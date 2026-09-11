import type { DisplayOrder } from "../../../things/properties/display-order.number-property.types.ts"
import type { Key } from "../../../things/properties/key.text-property.types.ts"
import type { EsoEnchantConstantName } from "../properties/eso-enchant-constant-name.text-property.types.ts"
import type { TemperGearThing } from "../things/temper-gear-thing.page-type.types.ts"

export type TemperArmorEnchant = TemperGearThing & {
  key: Key
  displayOrder: DisplayOrder
  esoEnchantConstantName: EsoEnchantConstantName
}
