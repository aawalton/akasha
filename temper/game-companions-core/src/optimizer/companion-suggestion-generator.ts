import { getValidTraitIdsForBaseRoles } from "../companion-base-roles-data"
import type { CompanionState } from "../companion-types"
import { companionArmorSlots } from "../equipment/companion-armor-slots-data"
import { type CompanionEquipmentQualityId } from "../equipment/companion-equipment-quality-data"
import { companionEquipmentQualities } from "../generated/temper-companion-equipment-quality.generated"
import { type CompanionJewelrySlotId } from "../equipment/companion-jewelry-slots-data"
import { companionJewelrySlots } from "../generated/temper-companion-jewelry-slot.generated"
import { companionTraits } from "../equipment/companion-traits-data"
import { companionWeaponSlots } from "../equipment/companion-weapon-slots-data"
import {
  type CompanionSkillSlotId,
  companionSkillSlots,
} from "../skills/companion-skill-slots-data"
import { companionSkills } from "../skills/companion-skills-data"
import { evaluate } from "./companion-optimizer"
import { getValidSkillIds } from "./companion-valid-skills"

export interface CompanionSuggestion {
  type: "trait" | "quality" | "skill"
  label: string
  improvement: number
  mutation:
    | { kind: "equipment"; updates: Partial<CompanionState["equipment"]> }
    | { kind: "skills"; updates: CompanionState["skills"] }
}

const QUALITY_ORDER: CompanionEquipmentQualityId[] = ["normal", "fine", "superior", "epic"]
const QUALITY_ORDER_WITH_LEGENDARY: CompanionEquipmentQualityId[] = [...QUALITY_ORDER, "legendary"]

const LEGENDARY_ELIGIBLE_SLOT_IDS = new Set<CompanionJewelrySlotId>(["ring-1", "ring-2"])

function getQualitiesAbove(
  current: CompanionEquipmentQualityId,
  includeLegendary: boolean
): readonly CompanionEquipmentQualityId[] {
  const order = includeLegendary ? QUALITY_ORDER_WITH_LEGENDARY : QUALITY_ORDER
  const idx = order.indexOf(current)
  if (idx === -1) return order
  return order.slice(idx + 1)
}

const MAX_SUGGESTIONS = 10
const ACTIVE_SLOT_IDS: CompanionSkillSlotId[] = [
  "active-1",
  "active-2",
  "active-3",
  "active-4",
  "active-5",
]

export function generateSuggestions(state: CompanionState): readonly CompanionSuggestion[] {
  if (state.companion.baseRoles.length === 0) return []

  const baseScore = evaluate(state)
  const suggestions: CompanionSuggestion[] = []

  const validTraitIds = getValidTraitIdsForBaseRoles(state.companion.baseRoles)

  for (const slotId of companionArmorSlots.ids) {
    const slot = state.equipment.armor[slotId]
    if (slot.itemType !== "armor") continue
    const currentTrait = slot.data.trait
    const slotName = companionArmorSlots.data[slotId].name

    for (const traitId of validTraitIds) {
      if (traitId === currentTrait) continue
      const newArmor = {
        ...state.equipment.armor,
        [slotId]: { ...slot, data: { ...slot.data, trait: traitId } },
      }
      const newState = { ...state, equipment: { ...state.equipment, armor: newArmor } }
      const score = evaluate(newState)
      if (score > baseScore) {
        suggestions.push({
          type: "trait",
          label: `${slotName}: ${companionTraits.data[currentTrait].name} \u2192 ${companionTraits.data[traitId].name}`,
          improvement: score - baseScore,
          mutation: { kind: "equipment", updates: { armor: newArmor } },
        })
      }
    }
  }

  for (const slotId of companionJewelrySlots.ids) {
    const slot = state.equipment.jewelry[slotId]
    if (slot.itemType !== "jewelry") continue
    const currentTrait = slot.data.trait
    const slotName = companionJewelrySlots.data[slotId].name

    for (const traitId of validTraitIds) {
      if (traitId === currentTrait) continue
      const newJewelry = {
        ...state.equipment.jewelry,
        [slotId]: { ...slot, data: { ...slot.data, trait: traitId } },
      }
      const newState = { ...state, equipment: { ...state.equipment, jewelry: newJewelry } }
      const score = evaluate(newState)
      if (score > baseScore) {
        suggestions.push({
          type: "trait",
          label: `${slotName}: ${companionTraits.data[currentTrait].name} \u2192 ${companionTraits.data[traitId].name}`,
          improvement: score - baseScore,
          mutation: { kind: "equipment", updates: { jewelry: newJewelry } },
        })
      }
    }
  }

  for (const slotId of companionWeaponSlots.ids) {
    const slot = state.equipment.weapons[slotId]
    if (slot.itemType !== "weapon") continue
    const currentTrait = slot.data.trait
    const slotName = companionWeaponSlots.data[slotId].name

    for (const traitId of validTraitIds) {
      if (traitId === currentTrait) continue
      const newWeapons = {
        ...state.equipment.weapons,
        [slotId]: { ...slot, data: { ...slot.data, trait: traitId } },
      }
      const newState = { ...state, equipment: { ...state.equipment, weapons: newWeapons } }
      const score = evaluate(newState)
      if (score > baseScore) {
        suggestions.push({
          type: "trait",
          label: `${slotName}: ${companionTraits.data[currentTrait].name} \u2192 ${companionTraits.data[traitId].name}`,
          improvement: score - baseScore,
          mutation: { kind: "equipment", updates: { weapons: newWeapons } },
        })
      }
    }
  }

  for (const slotId of companionArmorSlots.ids) {
    const slot = state.equipment.armor[slotId]
    if (slot.itemType !== "armor") continue
    const currentQuality = slot.data.quality
    const slotName = companionArmorSlots.data[slotId].name

    for (const qualityId of getQualitiesAbove(currentQuality, false)) {
      const newArmor = {
        ...state.equipment.armor,
        [slotId]: { ...slot, data: { ...slot.data, quality: qualityId } },
      }
      const newState = { ...state, equipment: { ...state.equipment, armor: newArmor } }
      const score = evaluate(newState)
      if (score > baseScore) {
        suggestions.push({
          type: "quality",
          label: `${slotName}: ${companionEquipmentQualities.data[currentQuality].name} \u2192 ${companionEquipmentQualities.data[qualityId].name}`,
          improvement: score - baseScore,
          mutation: { kind: "equipment", updates: { armor: newArmor } },
        })
      }
    }
  }

  for (const slotId of companionJewelrySlots.ids) {
    const slot = state.equipment.jewelry[slotId]
    if (slot.itemType !== "jewelry") continue
    const currentQuality = slot.data.quality
    const slotName = companionJewelrySlots.data[slotId].name

    for (const qualityId of getQualitiesAbove(
      currentQuality,
      LEGENDARY_ELIGIBLE_SLOT_IDS.has(slotId)
    )) {
      const newJewelry = {
        ...state.equipment.jewelry,
        [slotId]: { ...slot, data: { ...slot.data, quality: qualityId } },
      }
      const newState = { ...state, equipment: { ...state.equipment, jewelry: newJewelry } }
      const score = evaluate(newState)
      if (score > baseScore) {
        suggestions.push({
          type: "quality",
          label: `${slotName}: ${companionEquipmentQualities.data[currentQuality].name} \u2192 ${companionEquipmentQualities.data[qualityId].name}`,
          improvement: score - baseScore,
          mutation: { kind: "equipment", updates: { jewelry: newJewelry } },
        })
      }
    }
  }

  for (const slotId of companionWeaponSlots.ids) {
    const slot = state.equipment.weapons[slotId]
    if (slot.itemType !== "weapon") continue
    const currentQuality = slot.data.quality
    const slotName = companionWeaponSlots.data[slotId].name

    for (const qualityId of getQualitiesAbove(currentQuality, false)) {
      const newWeapons = {
        ...state.equipment.weapons,
        [slotId]: { ...slot, data: { ...slot.data, quality: qualityId } },
      }
      const newState = { ...state, equipment: { ...state.equipment, weapons: newWeapons } }
      const score = evaluate(newState)
      if (score > baseScore) {
        suggestions.push({
          type: "quality",
          label: `${slotName}: ${companionEquipmentQualities.data[currentQuality].name} \u2192 ${companionEquipmentQualities.data[qualityId].name}`,
          improvement: score - baseScore,
          mutation: { kind: "equipment", updates: { weapons: newWeapons } },
        })
      }
    }
  }

  const allValidSkills = getValidSkillIds(state)

  for (const slotId of ACTIVE_SLOT_IDS) {
    const currentSkillId = state.skills["skill-bar"][slotId]
    const slotName = companionSkillSlots.data[slotId].name

    for (const skillId of allValidSkills) {
      if (skillId === currentSkillId) continue

      const newSkillBar = { ...state.skills["skill-bar"], [slotId]: skillId }
      const newSkills = { ...state.skills, "skill-bar": newSkillBar }
      const newState = { ...state, skills: newSkills }
      const score = evaluate(newState)
      if (score > baseScore) {
        suggestions.push({
          type: "skill",
          label: `${slotName}: ${companionSkills.data[currentSkillId].name} \u2192 ${companionSkills.data[skillId].name}`,
          improvement: score - baseScore,
          mutation: { kind: "skills", updates: newSkills },
        })
      }
    }
  }

  suggestions.sort((a, b) => b.improvement - a.improvement)
  return suggestions.slice(0, MAX_SUGGESTIONS)
}
