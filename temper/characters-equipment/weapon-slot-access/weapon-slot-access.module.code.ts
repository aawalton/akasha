import type {
  ShieldItem,
  WeaponItem,
} from "akasha/temper/characters-equipment/item-composites/item-composites.module.code.ts"
import type {
  WeaponBars,
  WeaponSlotItem,
} from "akasha/temper/characters-equipment/loadout-types/loadout-types.module.code.ts"
import { weaponTypes } from "akasha/temper/characters-equipment/weapon-types-data/weapon-types-data.module.code.ts"
import type { WeaponBar } from "akasha/temper/equipment-kinds/weapon-bars/weapon-bars.module.code.ts"

export function isWeaponSlot(
  slot: WeaponSlotItem
): slot is { itemType: "weapon"; data: WeaponItem } {
  return slot.itemType === "weapon"
}

export function isShieldSlot(
  slot: WeaponSlotItem
): slot is { itemType: "shield"; data: ShieldItem } {
  return slot.itemType === "shield"
}

export function getWeaponItem(
  bars: WeaponBars,
  slotId: "main-hand" | "off-hand",
  barId: WeaponBar
): WeaponSlotItem {
  return bars[barId][slotId]
}

export function shouldHideWeaponSlot(
  bars: WeaponBars,
  slotId: "main-hand" | "off-hand",
  barId: WeaponBar
): boolean {
  if (slotId !== "off-hand") {
    return false
  }
  const mainHand = bars[barId]["main-hand"]
  if (isWeaponSlot(mainHand) && mainHand.data.type !== null) {
    return weaponTypes.data[mainHand.data.type].isTwoHanded
  }
  return false
}
