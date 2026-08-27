import { convertIconPathToUrl } from "@temper/game-characters-equipment/sets/get-equipment-icon"
import type { CompanionArmorWeight } from "../companion-types"
import type { CompanionArmorSlotId } from "./companion-armor-slots-data"
import type { CompanionEquipmentQualityId } from "./companion-equipment-quality-data"
import type { CompanionJewelrySlotId } from "./companion-jewelry-slots-data"
import type { CompanionWeaponTypeId } from "./companion-weapon-types-data"

const ARMOR_SLOT_TO_ICON_NAME: Record<CompanionArmorSlotId, string> = {
  head: "helm",
  shoulders: "shoulders",
  chest: "chest",
  hands: "gloves",
  waist: "belt",
  legs: "pants",
  feet: "boots",
}

export function getCompanionArmorIcon(
  slotId: CompanionArmorSlotId,
  weight: CompanionArmorWeight = "no-weight"
): string | null {
  if (weight === "no-weight") return null
  const iconName = ARMOR_SLOT_TO_ICON_NAME[slotId]
  const iconPath = `/esoui/art/icons/companions_u30_equipment_${iconName}_${weight}.dds`
  return convertIconPathToUrl(iconPath)
}

export function getCompanionJewelryIcon(
  slotId: CompanionJewelrySlotId,
  quality: CompanionEquipmentQualityId = "no-quality"
): string | null {
  if (quality === "no-quality") return null
  const iconName = slotId === "necklace" ? "necklace" : "ring"
  const iconPath = `/esoui/art/icons/companions_u30_equipment_${iconName}.dds`
  return convertIconPathToUrl(iconPath)
}

const WEAPON_TYPE_TO_ICON_NAME: Record<CompanionWeaponTypeId, string | null> = {
  "no-type": null,
  sword: "sword",
  axe: "axe",
  mace: "mace",
  dagger: "dagger",
  greatsword: "greatsword",
  battleaxe: "battleaxe",
  maul: "maul",
  bow: "bow",
  "inferno-staff": "infernostaff",
  "ice-staff": "froststaff",
  "lightning-staff": "lightningstaff",
  "restoration-staff": "restostaff",
  shield: "shield",
}

export function getCompanionWeaponIcon(weaponType: CompanionWeaponTypeId): string | null {
  const iconName = WEAPON_TYPE_TO_ICON_NAME[weaponType]
  if (iconName == null) return null
  const iconPath = `/esoui/art/icons/companions_u30_equipment_${iconName}.dds`
  return convertIconPathToUrl(iconPath)
}
