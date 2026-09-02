import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import type { ItemLevel } from "../item-composites"
import { getWeaponPowerForLevel } from "../level-scaling"
import type { EquipmentQualityId } from "@akasha/temper-equipment-kinds/equipment-qualities"
import { TEMPER_WEAPON_TYPES_BY_ID } from "./generated/temper-weapon-type.generated"

export interface WeaponTypeTemplate {
  id: string
  name: string
  esoWeaponType: string
  validSlots: readonly string[]
  weaponPower: number
  isTwoHanded: boolean
  enchantmentMultiplier: number
  skillLineId: string
}

export const weaponTypes = createDataFile<WeaponTypeTemplate>()(TEMPER_WEAPON_TYPES_BY_ID)

export type WeaponTypeId = (typeof weaponTypes.ids)[number]

const WEAPON_POWER_QUALITY_VALUES = {
  standard: { normal: 1072, fine: 1108, superior: 1108, epic: 1132, legendary: 1335 },
  twoHandedMelee: { normal: 1262, fine: 1304, superior: 1304, epic: 1332, legendary: 1571 },
} satisfies Record<string, Record<EquipmentQualityId, number>>

const TWO_HANDED_MELEE_TYPES: ReadonlySet<WeaponTypeId> = new Set([
  "greatsword",
  "battleaxe",
  "maul",
])

export function getWeaponPower(
  weaponType: WeaponTypeId,
  quality: EquipmentQualityId = "legendary",
  level?: ItemLevel
): number {
  if (weaponType === "no-type") {
    return 0
  }

  const isTwoHandedMelee = TWO_HANDED_MELEE_TYPES.has(weaponType)

  if (level !== undefined) {
    return getWeaponPowerForLevel(level, isTwoHandedMelee, quality)
  }

  if (isTwoHandedMelee) {
    return WEAPON_POWER_QUALITY_VALUES.twoHandedMelee[quality]
  }

  return WEAPON_POWER_QUALITY_VALUES.standard[quality]
}
