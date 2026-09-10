import type { SetId } from "akasha/temper/equipment/set-ids/set-ids.module.code.ts"
import type { SetTemplate } from "akasha/temper/equipment/set-template/set-template.module.code.ts"
import type { EquipmentQualityOptionId } from "../../equipment-kinds/equipment-qualities/equipment-qualities.module.code.ts"
import {
  bulkUpdateArmorQuality,
  bulkUpdateArmorSet,
} from "../bulk-update-armor/bulk-update-armor.module.code.ts"
import {
  bulkUpdateJewelryQuality,
  bulkUpdateJewelrySet,
} from "../bulk-update-jewelry/bulk-update-jewelry.module.code.ts"
import {
  bulkUpdateWeaponQuality,
  bulkUpdateWeaponSet,
} from "../bulk-update-weapons/bulk-update-weapons.module.code.ts"
import type { Loadout } from "../loadout-types/loadout-types.module.code.ts"

export function bulkUpdateAllSets(
  equipment: Loadout,
  oldValue: SetId,
  newValue: SetId,
  availableSets: readonly SetTemplate[]
): Partial<Loadout> {
  return {
    ...bulkUpdateArmorSet(equipment, oldValue, newValue, availableSets),
    ...bulkUpdateJewelrySet(equipment, oldValue, newValue, availableSets),
    ...bulkUpdateWeaponSet(equipment, oldValue, newValue, availableSets),
  }
}

export function bulkUpdateAllQuality(
  equipment: Loadout,
  oldValue: EquipmentQualityOptionId,
  newValue: EquipmentQualityOptionId
): Partial<Loadout> {
  return {
    ...bulkUpdateArmorQuality(equipment, oldValue, newValue),
    ...bulkUpdateJewelryQuality(equipment, oldValue, newValue),
    ...bulkUpdateWeaponQuality(equipment, oldValue, newValue),
  }
}
