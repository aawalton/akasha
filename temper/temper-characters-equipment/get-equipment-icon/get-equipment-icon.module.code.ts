import type { StandardArmorWeightId } from "@akasha/temper-equipment/armor-weight-ids"
import type { EquipmentPattern } from "@akasha/temper-equipment/set-patterns"
import type { SetTemplate } from "@akasha/temper-equipment/set-template"
import {
  type EquipmentType,
  isJewelryType,
  isStandardArmorType,
  isWeaponType,
} from "../set-equipment-types/set-equipment-types.module.code.ts"

export function getEquipmentIcon(
  set: SetTemplate | null,
  equipmentType: EquipmentType,
  armorWeight?: StandardArmorWeightId | null
): string | null {
  if (!set || !("icons" in set) || !set.icons) return null

  const icons: Partial<Record<EquipmentPattern, string>> = set.icons

  if (isWeaponType(equipmentType)) {
    if (icons[equipmentType] != null) return icons[equipmentType]
    if (icons["weapon:*"] != null) return icons["weapon:*"]
  }

  if (isJewelryType(equipmentType)) {
    if (icons[equipmentType] != null) return icons[equipmentType]
    if (icons["jewelry:*"] != null) return icons["jewelry:*"]
  }

  if (isStandardArmorType(equipmentType)) {
    if (armorWeight != null) {
      const specificKey: EquipmentPattern = `${equipmentType}:${armorWeight}`
      if (icons[specificKey] != null) return icons[specificKey]
    }

    const wildcardKey: EquipmentPattern = `${equipmentType}:*`
    if (icons[wildcardKey] != null) return icons[wildcardKey]

    if (armorWeight != null) {
      const weightWildcardKey: EquipmentPattern = `*:${armorWeight}`
      if (icons[weightWildcardKey] != null) return icons[weightWildcardKey]
    }
  }

  if (equipmentType === "shield") {
    if (icons["shield"] != null) return icons["shield"]
  }

  return icons["*"] ?? null
}

export function convertIconPathToUrl(iconPath: string | null): string | null {
  if (iconPath == null) return null
  return `https://esoicons.uesp.net${iconPath.replace(".dds", ".png")}`
}
