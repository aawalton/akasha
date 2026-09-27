import {
  type EquipmentQualityOptionId,
  equipmentQualities,
} from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"

export function getQualityVariant(
  quality: EquipmentQualityOptionId,
  mutedVariant: "elevation-muted" = "elevation-muted"
): "elevation-muted" | "normal" | "fine" | "superior" | "epic" | "legendary" | "mythic" {
  if (quality === "no-quality") return mutedVariant
  return quality
}

export function getQualityClassName(quality: EquipmentQualityOptionId): string {
  if (quality === "no-quality") return ""
  return `text-${quality}`
}

export function getQualityLabel(quality: EquipmentQualityOptionId): string {
  const qualities = equipmentQualities().data
  return qualities[quality]?.name ?? qualities["no-quality"].name
}

export function availableQualityOptions(): ReturnType<typeof equipmentQualities>["list"] {
  return equipmentQualities().list.filter((q) => q.available)
}
