import { isCompanionEquipmentQualityId } from "akasha/temper/catalog/companion/companions-core/modules/companion-equipment-qualities/companion-equipment-qualities.module.code.ts"
import { companionTraits } from "akasha/temper/catalog/companion/companions-core/modules/companion-traits/companion-traits.module.code.ts"
import type { CompanionWeaponSlotItem } from "akasha/temper/catalog/companion/companions-core/modules/companion-types/companion-types.module.code.ts"
import type { CompanionWeaponSlotId } from "akasha/temper/catalog/companion/companions-core/modules/companion-weapon-slots/companion-weapon-slots.module.code.ts"
import {
  isCompanionWeaponTypeId,
  isTwoHandedWeapon,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-weapon-types/companion-weapon-types.module.code.ts"
import type { CompanionEquipmentPanelProps } from "akasha/temper/web/modules/companion-equipment-panel-types/companion-equipment-panel-types.module.code.ts"

export function weaponsAfterChange(
  weapons: CompanionEquipmentPanelProps["equipment"]["weapons"],
  slotId: CompanionWeaponSlotId,
  field: "type" | "trait" | "quality",
  value: string
): CompanionEquipmentPanelProps["equipment"]["weapons"] {
  const emptyOffHand: CompanionWeaponSlotItem = {
    itemType: "weapon",
    data: { slot: "off-hand", type: "no-type", trait: "no-trait", quality: "no-quality" },
  }
  const currentSlot = weapons[slotId]
  const currentData = currentSlot.itemType === "weapon" ? currentSlot.data : null

  const newType =
    field === "type" && isCompanionWeaponTypeId(value) ? value : (currentData?.type ?? "no-type")

  const newSlot: CompanionWeaponSlotItem = {
    itemType: "weapon",
    data: {
      slot: slotId,
      type: newType,
      trait:
        field === "trait" && companionTraits().has(value)
          ? value
          : (currentData?.trait ?? "no-trait"),
      quality:
        field === "quality" && isCompanionEquipmentQualityId(value)
          ? value
          : (currentData?.quality ?? "no-quality"),
    },
  }

  if (slotId === "main-hand" && field === "type") {
    const isTwoHanded = newType !== "no-type" && isTwoHandedWeapon(newType)
    if (isTwoHanded) return { ...weapons, "main-hand": newSlot, "off-hand": emptyOffHand }
  }

  if (slotId === "main-hand") {
    const isNotTwoHanded = newType !== "no-type" && !isTwoHandedWeapon(newType)
    const offHandSlot = weapons["off-hand"]
    const offHandHasType = offHandSlot.itemType === "weapon" && offHandSlot.data.type !== "no-type"
    if (isNotTwoHanded && !offHandHasType) {
      return {
        ...weapons,
        "main-hand": newSlot,
        "off-hand": { itemType: "weapon", data: { ...newSlot.data, slot: "off-hand" } },
      }
    }
    if (newType === "no-type") {
      return { ...weapons, "main-hand": newSlot, "off-hand": emptyOffHand }
    }
  }

  return { ...weapons, [slotId]: newSlot }
}
