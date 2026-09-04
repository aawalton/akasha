import type { WeaponTypeId } from "@akasha/temper-equipment/weapon-type-ids"
import type { EquipmentQualityId } from "@akasha/temper-equipment-kinds/equipment-qualities"
import { createDataFile, type DataFile } from "@akasha/utils-narrow/create-data-file"
import type { ItemLevel } from "../item-composites/item-composites.module.code.ts"
import { getWeaponPowerForLevel } from "../level-scaling/level-scaling.module.code.ts"
export const TEMPER_WEAPON_TYPES_BY_ID = {
  "axe": {
    id: "axe" as const,
    name: "Axe",
    esoWeaponType: "WEAPONTYPE_AXE",
    validSlots: ["main-hand"] as const,
    weaponPower: 1335,
    isTwoHanded: false,
    enchantmentMultiplier: 0.5,
    skillLineId: "weapon-one-hand",
  },
  "battleaxe": {
    id: "battleaxe" as const,
    name: "Battleaxe",
    esoWeaponType: "WEAPONTYPE_TWO_HANDED_AXE",
    validSlots: ["main-hand"] as const,
    weaponPower: 1571,
    isTwoHanded: true,
    enchantmentMultiplier: 1,
    skillLineId: "weapon-two-handed",
  },
  "bow": {
    id: "bow" as const,
    name: "Bow",
    esoWeaponType: "WEAPONTYPE_BOW",
    validSlots: ["main-hand"] as const,
    weaponPower: 1335,
    isTwoHanded: true,
    enchantmentMultiplier: 1,
    skillLineId: "weapon-bow",
  },
  "dagger": {
    id: "dagger" as const,
    name: "Dagger",
    esoWeaponType: "WEAPONTYPE_DAGGER",
    validSlots: ["main-hand"] as const,
    weaponPower: 1335,
    isTwoHanded: false,
    enchantmentMultiplier: 0.5,
    skillLineId: "weapon-one-hand",
  },
  "greatsword": {
    id: "greatsword" as const,
    name: "Greatsword",
    esoWeaponType: "WEAPONTYPE_TWO_HANDED_SWORD",
    validSlots: ["main-hand"] as const,
    weaponPower: 1571,
    isTwoHanded: true,
    enchantmentMultiplier: 1,
    skillLineId: "weapon-two-handed",
  },
  "ice-staff": {
    id: "ice-staff" as const,
    name: "Ice Staff",
    esoWeaponType: "WEAPONTYPE_FROST_STAFF",
    validSlots: ["main-hand"] as const,
    weaponPower: 1335,
    isTwoHanded: true,
    enchantmentMultiplier: 1,
    skillLineId: "weapon-destruction-staff",
  },
  "inferno-staff": {
    id: "inferno-staff" as const,
    name: "Inferno Staff",
    esoWeaponType: "WEAPONTYPE_FIRE_STAFF",
    validSlots: ["main-hand"] as const,
    weaponPower: 1335,
    isTwoHanded: true,
    enchantmentMultiplier: 1,
    skillLineId: "weapon-destruction-staff",
  },
  "lightning-staff": {
    id: "lightning-staff" as const,
    name: "Lightning Staff",
    esoWeaponType: "WEAPONTYPE_LIGHTNING_STAFF",
    validSlots: ["main-hand"] as const,
    weaponPower: 1335,
    isTwoHanded: true,
    enchantmentMultiplier: 1,
    skillLineId: "weapon-destruction-staff",
  },
  "mace": {
    id: "mace" as const,
    name: "Mace",
    esoWeaponType: "WEAPONTYPE_HAMMER",
    validSlots: ["main-hand"] as const,
    weaponPower: 1335,
    isTwoHanded: false,
    enchantmentMultiplier: 0.5,
    skillLineId: "weapon-one-hand",
  },
  "maul": {
    id: "maul" as const,
    name: "Maul",
    esoWeaponType: "WEAPONTYPE_TWO_HANDED_HAMMER",
    validSlots: ["main-hand"] as const,
    weaponPower: 1571,
    isTwoHanded: true,
    enchantmentMultiplier: 1,
    skillLineId: "weapon-two-handed",
  },
  "no-type": {
    id: "no-type" as const,
    name: "No Type",
    esoWeaponType: "WEAPONTYPE_NONE",
    validSlots: ["main-hand"] as const,
    weaponPower: 0,
    isTwoHanded: false,
    enchantmentMultiplier: 0,
    skillLineId: "",
  },
  "restoration-staff": {
    id: "restoration-staff" as const,
    name: "Restoration Staff",
    esoWeaponType: "WEAPONTYPE_HEALING_STAFF",
    validSlots: ["main-hand"] as const,
    weaponPower: 1335,
    isTwoHanded: true,
    enchantmentMultiplier: 1,
    skillLineId: "weapon-restoration-staff",
  },
  "sword": {
    id: "sword" as const,
    name: "Sword",
    esoWeaponType: "WEAPONTYPE_SWORD",
    validSlots: ["main-hand"] as const,
    weaponPower: 1335,
    isTwoHanded: false,
    enchantmentMultiplier: 0.5,
    skillLineId: "weapon-one-hand",
  },
} as const satisfies Record<string, WeaponTypeTemplate>

export interface WeaponTypeTemplate {
  id: WeaponTypeId
  name: string
  esoWeaponType: string
  validSlots: readonly string[]
  weaponPower: number
  isTwoHanded: boolean
  enchantmentMultiplier: number
  skillLineId: string
}

export const weaponTypes: DataFile<WeaponTypeId, WeaponTypeTemplate> =
  createDataFile<WeaponTypeTemplate>()(TEMPER_WEAPON_TYPES_BY_ID)

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
