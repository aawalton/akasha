import type { EquipmentQualityId } from "@akasha/temper-equipment-kinds/equipment-qualities"
import type { CompanionEquipmentQualityId } from "../companion-equipment-qualities/companion-equipment-qualities.module.code.ts"
import type { CompanionWeaponTypeId } from "../companion-weapon-types/companion-weapon-types.module.code.ts"

type WeaponCategory = "one-handed" | "two-handed" | "shield" | "none"

const WEAPON_CATEGORIES: Record<CompanionWeaponTypeId, WeaponCategory> = {
  "no-type": "none",
  sword: "one-handed",
  axe: "one-handed",
  mace: "one-handed",
  dagger: "one-handed",
  greatsword: "two-handed",
  battleaxe: "two-handed",
  maul: "two-handed",
  bow: "two-handed",
  "inferno-staff": "two-handed",
  "ice-staff": "two-handed",
  "lightning-staff": "two-handed",
  "restoration-staff": "two-handed",
  shield: "shield",
}

const WEAPON_BASE_DAMAGES: Record<WeaponCategory, Record<EquipmentQualityId, number>> = {
  none: {
    normal: 0,
    fine: 0,
    superior: 0,
    epic: 0,
    legendary: 0,
  },
  "one-handed": {
    normal: 300,
    fine: 350,
    superior: 400,
    epic: 450,
    legendary: 500,
  },
  "two-handed": {
    normal: 600,
    fine: 700,
    superior: 800,
    epic: 900,
    legendary: 1000,
  },
  shield: {
    normal: 0,
    fine: 0,
    superior: 0,
    epic: 0,
    legendary: 0,
  },
}

const SHIELD_ARMOR_VALUES: Record<EquipmentQualityId, number> = {
  normal: 2600,
  fine: 2700,
  superior: 2800,
  epic: 2900,
  legendary: 3000,
}

export function getCompanionWeaponBaseDamage(
  weaponTypeId: CompanionWeaponTypeId,
  quality: CompanionEquipmentQualityId = "legendary"
): number {
  if (quality === "no-quality") return 0
  const category = WEAPON_CATEGORIES[weaponTypeId]
  return WEAPON_BASE_DAMAGES[category][quality]
}

export function isCompanionWeaponShield(weaponTypeId: CompanionWeaponTypeId): boolean {
  return WEAPON_CATEGORIES[weaponTypeId] === "shield"
}

export function getCompanionShieldArmorValue(
  quality: CompanionEquipmentQualityId = "legendary"
): number {
  if (quality === "no-quality") return 0
  return SHIELD_ARMOR_VALUES[quality]
}
