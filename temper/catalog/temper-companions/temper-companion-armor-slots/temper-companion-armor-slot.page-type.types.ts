import type { Key } from "../../../things/properties/key.text-property.types.ts"
import type { EquipType } from "../temper-companion-things/properties/equip-type.number-property.types.ts"
import type { TemperCompanionThing } from "../temper-companion-things/temper-companion-thing.page-type.types.ts"

export type TemperCompanionArmorSlot = TemperCompanionThing & {
  key: Key
  equipType: EquipType
}
