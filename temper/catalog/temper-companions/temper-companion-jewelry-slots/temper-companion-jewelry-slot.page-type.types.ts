import type { Key } from "../../../things/properties/key.text-property.ts"
import type { EquipType } from "../temper-companion-things/properties/equip-type.number-property.types.ts"
import type { SlotCategory } from "../temper-companion-things/properties/slot-category.text-property.types.ts"
import type { TemperCompanionThing } from "../temper-companion-things/temper-companion-thing.page-type.types.ts"

export type TemperCompanionJewelrySlot = TemperCompanionThing & {
  key: Key
  equipType: EquipType
  slotCategory: SlotCategory
}
