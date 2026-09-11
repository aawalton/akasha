import type { EquipType } from "akasha/temper/catalog/temper-companions/temper-companion-things/properties/equip-type.number-property.types.ts"
import type { TemperCompanionThing } from "akasha/temper/catalog/temper-companions/temper-companion-things/temper-companion-thing.page-type.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"

export type TemperCompanionArmorSlot = TemperCompanionThing & {
  key: Key
  equipType: EquipType
}
