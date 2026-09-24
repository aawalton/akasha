import type { Slug } from "akasha/page/properties/slug.text-property.types.ts"
import type { EquipmentQualityOptionId } from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"
import type { SetTemplate } from "akasha/temper/catalog/gear/equipment/modules/set-template/set-template.module.code.ts"
import {
  bulkUpdateArmorQuality,
  bulkUpdateArmorSet,
} from "akasha/temper/player/character/characters-equipment/modules/bulk-update-armor/bulk-update-armor.module.code.ts"
import {
  bulkUpdateJewelryQuality,
  bulkUpdateJewelrySet,
} from "akasha/temper/player/character/characters-equipment/modules/bulk-update-jewelry/bulk-update-jewelry.module.code.ts"
import {
  bulkUpdateWeaponQuality,
  bulkUpdateWeaponSet,
} from "akasha/temper/player/character/characters-equipment/modules/bulk-update-weapons/bulk-update-weapons.module.code.ts"
import type { Loadout } from "akasha/temper/player/character/characters-equipment/modules/loadout-types/loadout-types.module.code.ts"

export function bulkUpdateAllSets(
  equipment: Loadout,
  oldValue: Slug,
  newValue: Slug,
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
