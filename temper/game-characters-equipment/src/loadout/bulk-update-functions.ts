import type { EquipmentQualityOptionId } from "@akasha/temper-equipment-kinds/equipment-qualities"
import type { SetTemplate } from "@akasha/temper-equipment/set-template"
import type { SetId } from "@akasha/temper-equipment/set-ids"
import { bulkUpdateArmorQuality, bulkUpdateArmorSet } from "./bulk-update-armor"
import { bulkUpdateJewelryQuality, bulkUpdateJewelrySet } from "./bulk-update-jewelry"
import { bulkUpdateWeaponQuality, bulkUpdateWeaponSet } from "./bulk-update-weapons"
import type { Loadout } from "./loadout-types"

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
