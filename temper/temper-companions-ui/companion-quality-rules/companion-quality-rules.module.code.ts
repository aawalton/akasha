import type { CompanionEquipmentQualityId } from "@akasha/temper-companions-core/companion-equipment-qualities"

export function getQualityVariant(
  quality: CompanionEquipmentQualityId,
  mutedVariant: "elevation-muted" = "elevation-muted"
): "elevation-muted" | "normal" | "fine" | "superior" | "epic" | "legendary" {
  if (quality === "no-quality") return mutedVariant
  return quality
}

export function getQualityClassName(quality: CompanionEquipmentQualityId): string {
  if (quality === "no-quality") return ""
  return `text-${quality}`
}
