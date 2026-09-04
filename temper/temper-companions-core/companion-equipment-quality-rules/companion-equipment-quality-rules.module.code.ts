import type { CompanionEquipmentQualityId } from "../companion-equipment-qualities/companion-equipment-qualities.module.code.ts"
import { companionEquipmentQualities } from "../companion-equipment-qualities/companion-equipment-qualities.module.code.ts"

export const AVAILABLE_QUALITY_OPTIONS = companionEquipmentQualities.list.filter((q) => q.available)

const LEGENDARY_ELIGIBLE_SLOT_IDS = new Set(["ring-1", "ring-2"])

export const LEGENDARY_QUALITY_OPTIONS = companionEquipmentQualities.list.filter(
  (q) => q.available || q.id === "legendary"
)

export function getAvailableQualityOptions(slotId?: string) {
  if (slotId != null && LEGENDARY_ELIGIBLE_SLOT_IDS.has(slotId)) return LEGENDARY_QUALITY_OPTIONS
  return AVAILABLE_QUALITY_OPTIONS
}

export function capQualityForSlot(
  slotId: string,
  quality: CompanionEquipmentQualityId
): CompanionEquipmentQualityId {
  if (quality === "legendary" && !LEGENDARY_ELIGIBLE_SLOT_IDS.has(slotId)) return "epic"
  return quality
}
