import { companionArmorSlots } from "../companion-armor-slots/companion-armor-slots.module.code.ts"
import type { CompanionJewelrySlotId } from "../companion-jewelry-slots/companion-jewelry-slots.module.code.ts"
import { companionJewelrySlots } from "../companion-jewelry-slots/companion-jewelry-slots.module.code.ts"
import type { CompanionTraitId } from "../companion-traits/companion-traits.module.code.ts"
import type { CompanionState } from "../companion-types/companion-types.module.code.ts"
import { companionWeaponSlots } from "../companion-weapon-slots/companion-weapon-slots.module.code.ts"

const LEGENDARY_ELIGIBLE_SLOT_IDS = new Set<CompanionJewelrySlotId>(["ring-1", "ring-2"])

export function setNextEmptyTrait(
  build: CompanionState,
  traitId: CompanionTraitId
): { slotKey: string; state: CompanionState } {
  for (const slotId of companionArmorSlots.ids) {
    const slot = build.equipment.armor[slotId]
    if (slot.itemType === "armor" && slot.data.trait === "no-trait") {
      return {
        slotKey: slotId,
        state: {
          ...build,
          equipment: {
            ...build.equipment,
            armor: {
              ...build.equipment.armor,
              [slotId]: { ...slot, data: { ...slot.data, trait: traitId } },
            },
          },
        },
      }
    }
  }

  for (const slotId of companionJewelrySlots.ids) {
    const slot = build.equipment.jewelry[slotId]
    if (slot.itemType === "jewelry" && slot.data.trait === "no-trait") {
      return {
        slotKey: slotId,
        state: {
          ...build,
          equipment: {
            ...build.equipment,
            jewelry: {
              ...build.equipment.jewelry,
              [slotId]: { ...slot, data: { ...slot.data, trait: traitId } },
            },
          },
        },
      }
    }
  }

  for (const slotId of companionWeaponSlots.ids) {
    const slot = build.equipment.weapons[slotId]
    if (slot.itemType === "weapon" && slot.data.trait === "no-trait") {
      return {
        slotKey: slotId,
        state: {
          ...build,
          equipment: {
            ...build.equipment,
            weapons: {
              ...build.equipment.weapons,
              [slotId]: { ...slot, data: { ...slot.data, trait: traitId } },
            },
          },
        },
      }
    }
  }

  throw new Error("No empty trait slot found")
}

export function clearAllTraits(build: CompanionState): CompanionState {
  const armor = { ...build.equipment.armor }
  for (const slotId of companionArmorSlots.ids) {
    const slot = armor[slotId]
    if (slot.itemType === "armor") {
      armor[slotId] = { ...slot, data: { ...slot.data, trait: "no-trait" } }
    }
  }

  const jewelry = { ...build.equipment.jewelry }
  for (const slotId of companionJewelrySlots.ids) {
    const slot = jewelry[slotId]
    if (slot.itemType === "jewelry") {
      jewelry[slotId] = { ...slot, data: { ...slot.data, trait: "no-trait" } }
    }
  }

  const weapons = { ...build.equipment.weapons }
  for (const slotId of companionWeaponSlots.ids) {
    const slot = weapons[slotId]
    if (slot.itemType === "weapon") {
      weapons[slotId] = { ...slot, data: { ...slot.data, trait: "no-trait" } }
    }
  }

  return {
    ...build,
    equipment: { ...build.equipment, armor, jewelry, weapons },
  }
}

export function setRingQualityToLegendary(build: CompanionState): CompanionState {
  let jewelry = build.equipment.jewelry
  let changed = false
  for (const slotId of LEGENDARY_ELIGIBLE_SLOT_IDS) {
    const slot = jewelry[slotId]
    if (slot.itemType === "jewelry" && slot.data.quality !== "legendary") {
      if (!changed) {
        jewelry = { ...jewelry }
        changed = true
      }
      jewelry[slotId] = { ...slot, data: { ...slot.data, quality: "legendary" } }
    }
  }
  if (!changed) return build
  return { ...build, equipment: { ...build.equipment, jewelry } }
}

export function countEmptyTraitSlots(build: CompanionState): number {
  let count = 0
  for (const slot of Object.values(build.equipment.armor)) {
    if (slot.itemType === "armor" && slot.data.trait === "no-trait") count++
  }
  for (const slot of Object.values(build.equipment.jewelry)) {
    if (slot.itemType === "jewelry" && slot.data.trait === "no-trait") count++
  }
  for (const slot of Object.values(build.equipment.weapons)) {
    if (slot.itemType === "weapon" && slot.data.trait === "no-trait") count++
  }
  return count
}
