import type { SetId } from "@akasha/temper-equipment/set-ids"
import type { SetTemplate } from "@akasha/temper-equipment/set-template"
import type { WeaponTraitId } from "@akasha/temper-equipment/weapon-traits"
import type { EquipmentQualityOptionId } from "@akasha/temper-equipment-kinds/equipment-qualities"
import { weaponBars } from "@akasha/temper-equipment-kinds/weapon-bars"
import { weaponSlots } from "@akasha/temper-equipment-kinds/weapon-slots"
import type { Loadout, WeaponBars } from "../loadout-types/loadout-types.module.code.ts"
import { isSetValidForSlot } from "../set-pattern-matcher/set-pattern-matcher.module.code.ts"
import type { WeaponEnchantmentId } from "../weapon-enchants/weapon-enchants.module.code.ts"
import {
  getWeaponItem,
  isWeaponSlot,
  shouldHideWeaponSlot,
} from "../weapon-slot-access/weapon-slot-access.module.code.ts"
import { updateWeaponItem } from "../weapon-slot-mutations/weapon-slot-mutations.module.code.ts"

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
  oldValue: SetId,
  newValue: SetId,
  availableSets: readonly SetTemplate[]
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
