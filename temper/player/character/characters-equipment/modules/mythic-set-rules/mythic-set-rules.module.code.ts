import type { Slug } from "akasha/page/properties/slug.text-property.types.ts"
import { weaponBars } from "akasha/temper/catalog/gear/equipment/kind/modules/weapon-bars/weapon-bars.module.code.ts"
import { weaponSlots } from "akasha/temper/catalog/gear/equipment/kind/modules/weapon-slots/weapon-slots.module.code.ts"
import type { SetTemplate } from "akasha/temper/catalog/gear/equipment/modules/set-template/set-template.module.code.ts"
import type {
  Loadout,
  WeaponSlot,
} from "akasha/temper/player/character/characters-equipment/modules/loadout-types/loadout-types.module.code.ts"
import {
  getWeaponItem,
  isShieldSlot,
  isWeaponSlot,
} from "akasha/temper/player/character/characters-equipment/modules/weapon-slot-access/weapon-slot-access.module.code.ts"
import { valuesOf } from "akasha/temper/player/character/formula-framework/modules/record-parts/record-parts.module.code.ts"

export function getEquippedMythicSetId(
  loadout: Loadout,
  availableSets: readonly SetTemplate[]
): string | null {
  const allSetIds: string[] = []

  for (const slot of valuesOf(loadout.armor)) {
    if (slot.itemType === "armor") {
      allSetIds.push(slot.data.set)
    }
  }
  for (const slot of valuesOf(loadout.jewelry)) {
    if (slot.itemType === "jewelry") {
      allSetIds.push(slot.data.set)
    }
  }
  for (const slotConfig of weaponSlots.list) {
    if (slotConfig.id === "poison") continue

    for (const barConfig of weaponBars.list) {
      const slot = getWeaponItem(loadout, slotConfig.id, barConfig.id)
      if (isWeaponSlot(slot)) {
        allSetIds.push(slot.data.set)
      } else if (isShieldSlot(slot)) {
        allSetIds.push(slot.data.set)
      }
    }
  }

  for (const setId of allSetIds) {
    const set = availableSets.find((s) => s.id === setId)
    if (set?.subcategoryId === "mythic") {
      return set.id
    }
  }
  return null
}

export function getMythicSlots<T extends { id: string }>(
  items: Record<string, { itemType?: string; data?: { set?: Slug } | null; set?: Slug }>,
  availableSets: readonly SetTemplate[],
  slots: readonly T[]
): Record<string, string> {
  const mythicSlots: Record<string, string> = {}
  for (const slotConfig of slots) {
    const item = items[slotConfig.id]
    const setId =
      item?.itemType === "armor" || item?.itemType === "jewelry" ? item.data?.set : item?.set
    if (setId != null) {
      const set = availableSets.find((s) => s.id === setId)
      if (set?.subcategoryId === "mythic") {
        mythicSlots[setId] = slotConfig.id
      }
    }
  }
  return mythicSlots
}

export function getWeaponMythicSlots(
  primaryBar: WeaponSlot,
  backupBar: WeaponSlot,
  availableSets: readonly SetTemplate[]
): Record<string, string> {
  const slots: Record<string, string> = {}
  const bars = {
    "primary-weapon-bar": primaryBar,
    "backup-weapon-bar": backupBar,
  }

  for (const slotConfig of weaponSlots.list) {
    if (slotConfig.id === "poison") continue

    for (const barConfig of weaponBars.list) {
      const slot = getWeaponItem(bars, slotConfig.id, barConfig.id)

      const setId = isWeaponSlot(slot) ? slot.data.set : isShieldSlot(slot) ? slot.data.set : null

      if (setId != null) {
        const set = availableSets.find((s) => s.id === setId)
        if (set?.subcategoryId === "mythic") {
          const displayLabel = `${barConfig.name} ${slotConfig.name}`
          slots[setId] = displayLabel
        }
      }
    }
  }
  return slots
}
