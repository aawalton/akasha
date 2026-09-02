import type { EquipmentQualityOptionId } from "@akasha/temper-equipment-kinds/equipment-qualities"
import type { SetsAll, SetsAllId } from "../sets/sets-all-data"
import { bulkUpdateArmorQuality, bulkUpdateArmorSet } from "./bulk-update-armor"
import { bulkUpdateJewelryQuality, bulkUpdateJewelrySet } from "./bulk-update-jewelry"
import { bulkUpdateWeaponQuality, bulkUpdateWeaponSet } from "./bulk-update-weapons"
import type { Loadout } from "./loadout-types"

export function bulkUpdateAllSets(
  equipment: Loadout,
  oldValue: SetsAllId,
  newValue: SetsAllId,
  availableSets: readonly SetsAll[]
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
