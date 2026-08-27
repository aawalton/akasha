import type { WeaponEnchantmentId } from "../enchants/weapon-enchants-data"
import type { EquipmentQualityOptionId } from "../quality-data"
import { isSetValidForSlot } from "../sets/pattern-matcher"
import type { SetsAll, SetsAllId } from "../sets/sets-all-data"
import type { WeaponTraitId } from "../traits/weapon-traits-data"
import { weaponBars } from "../weapons/weapon-bars-data"
import { weaponSlots } from "../weapons/weapon-slots-data"
import type { Loadout, WeaponBars } from "./loadout-types"
import { getWeaponItem, isWeaponSlot, shouldHideWeaponSlot } from "./weapon-slot-access"
import { updateWeaponItem } from "./weapon-slot-mutations"

export function bulkUpdateWeaponTrait(
  equipment: Loadout,
  oldValue: WeaponTraitId,
  newValue: WeaponTraitId
): Partial<Loadout> {
  let result: Partial<Loadout> = {}

  const weaponEquipment: WeaponBars = {
    "primary-weapon-bar": equipment["primary-weapon-bar"],
    "backup-weapon-bar": equipment["backup-weapon-bar"],
  }

  for (const slotConfig of weaponSlots.list) {
    if (slotConfig.id === "poison") continue

    for (const barConfig of weaponBars.list) {
      const slot = getWeaponItem(weaponEquipment, slotConfig.id, barConfig.id)
      const isHidden = shouldHideWeaponSlot(weaponEquipment, slotConfig.id, barConfig.id)

      if (isHidden || !isWeaponSlot(slot)) {
        continue
      }

      if (slot.data.trait === oldValue) {
        const update = updateWeaponItem(weaponEquipment, slotConfig.id, barConfig.id, {
          trait: newValue,
        })
        result = { ...result, ...update }
        equipment = { ...equipment, ...update }
        weaponEquipment[barConfig.id] = equipment[barConfig.id]
      }
    }
  }

  return result
}

export function bulkUpdateWeaponEnchant(
  equipment: Loadout,
  oldValue: WeaponEnchantmentId,
  newValue: WeaponEnchantmentId
): Partial<Loadout> {
  let result: Partial<Loadout> = {}

  const weaponEquipment: WeaponBars = {
    "primary-weapon-bar": equipment["primary-weapon-bar"],
    "backup-weapon-bar": equipment["backup-weapon-bar"],
  }

  for (const slotConfig of weaponSlots.list) {
    if (slotConfig.id === "poison") continue

    for (const barConfig of weaponBars.list) {
      const slot = getWeaponItem(weaponEquipment, slotConfig.id, barConfig.id)
      const isHidden = shouldHideWeaponSlot(weaponEquipment, slotConfig.id, barConfig.id)

      if (isHidden || !isWeaponSlot(slot)) {
        continue
      }

      if (slot.data.enchantment === oldValue) {
        const update = updateWeaponItem(weaponEquipment, slotConfig.id, barConfig.id, {
          enchantment: newValue,
        })
        result = { ...result, ...update }
        equipment = { ...equipment, ...update }
        weaponEquipment[barConfig.id] = equipment[barConfig.id]
      }
    }
  }

  return result
}

export function bulkUpdateWeaponSet(
  equipment: Loadout,
  oldValue: SetsAllId,
  newValue: SetsAllId,
  availableSets: readonly SetsAll[]
): Partial<Loadout> {
  let result: Partial<Loadout> = {}
  const newSet = newValue !== "no-set" ? availableSets.find((s) => s.id === newValue) : null

  const shouldUpdate = (current: string | null | undefined) => (current ?? "no-set") === oldValue

  const weaponEquipment: WeaponBars = {
    "primary-weapon-bar": equipment["primary-weapon-bar"],
    "backup-weapon-bar": equipment["backup-weapon-bar"],
  }

  for (const slotConfig of weaponSlots.list) {
    if (slotConfig.id === "poison") continue

    for (const barConfig of weaponBars.list) {
      const slot = getWeaponItem(weaponEquipment, slotConfig.id, barConfig.id)
      const isHidden = shouldHideWeaponSlot(weaponEquipment, slotConfig.id, barConfig.id)

      if (isHidden) {
        continue
      }

      if (slot.itemType === "empty") continue

      const currentSet = slot.data.set
      if (shouldUpdate(currentSet)) {
        const equipmentType = isWeaponSlot(slot) ? slot.data.type : "shield"

        if (!newSet || isSetValidForSlot(newSet, slotConfig.id, equipmentType, null)) {
          const update = updateWeaponItem(weaponEquipment, slotConfig.id, barConfig.id, {
            set: newValue,
            type: "no-type",
          })
          result = { ...result, ...update }
          equipment = { ...equipment, ...update }
          weaponEquipment[barConfig.id] = equipment[barConfig.id]
        }
      }
    }
  }

  return result
}

export function bulkUpdateWeaponQuality(
  equipment: Loadout,
  oldValue: EquipmentQualityOptionId,
  newValue: EquipmentQualityOptionId
): Partial<Loadout> {
  let result: Partial<Loadout> = {}

  const weaponEquipment: WeaponBars = {
    "primary-weapon-bar": equipment["primary-weapon-bar"],
    "backup-weapon-bar": equipment["backup-weapon-bar"],
  }

  for (const slotConfig of weaponSlots.list) {
    if (slotConfig.id === "poison") continue

    for (const barConfig of weaponBars.list) {
      const slot = getWeaponItem(weaponEquipment, slotConfig.id, barConfig.id)
      const isHidden = shouldHideWeaponSlot(weaponEquipment, slotConfig.id, barConfig.id)

      if (isHidden || !isWeaponSlot(slot)) {
        continue
      }

      const currentQuality = slot.data.quality ?? "no-quality"
      if (currentQuality === "mythic" && oldValue !== "mythic") continue
      if (currentQuality === oldValue) {
        const update = updateWeaponItem(weaponEquipment, slotConfig.id, barConfig.id, {
          quality: newValue,
        })
        result = { ...result, ...update }
        equipment = { ...equipment, ...update }
        weaponEquipment[barConfig.id] = equipment[barConfig.id]
      }
    }
  }

  return result
}
