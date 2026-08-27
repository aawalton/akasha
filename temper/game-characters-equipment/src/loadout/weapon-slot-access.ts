import type { ShieldItem, WeaponItem } from "../item-composites"
import type { WeaponBar } from "../weapons/weapon-bars-data"
import { weaponTypes } from "../weapons/weapon-types-data"
import type { WeaponBars, WeaponSlotItem } from "./loadout-types"

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
