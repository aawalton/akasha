import { weaponTypes } from "@akasha/temper-characters-equipment/weapon-types-data"
import type { StandardArmorWeightId } from "@akasha/temper-equipment/armor-weight-ids"
import type { RaceId } from "@akasha/temper-races/races"
import type { SkillSlotId } from "@akasha/temper-skill-kinds/skill-slots"
import { skillSlots } from "@akasha/temper-skill-kinds/skill-slots"
import type { SkillLineCategoryId } from "@akasha/temper-skill-lines/skill-line-category-data"
import { type SkillLineId, skillLines } from "@akasha/temper-skill-lines/skill-lines"
import type { SkillId } from "../character-skills/character-skills.module.code.ts"
import { skills } from "../character-skills/character-skills.module.code.ts"
import type { ArmorShape, WeaponBarShape } from "../query-shapes/query-shapes.module.code.ts"

export function getRacialSkillLineIdForRace(raceId: RaceId): SkillLineId | null {
  const raceToSkillLine: Partial<Record<RaceId, SkillLineId>> = {
    argonian: "racial-argonian-skills",
    breton: "racial-breton-skills",
    dunmer: "racial-dark-elf-skills",
    altmer: "racial-high-elf-skills",
    imperial: "racial-imperial-skills",
    khajiit: "racial-khajiit-skills",
    nord: "racial-nord-skills",
    orc: "racial-orc-skills",
    redguard: "racial-redguard-skills",
    bosmer: "racial-wood-elf-skills",
  }
  return raceToSkillLine[raceId] ?? null
}

export function getSlottedSkillLineIds(
  skillBar: Record<SkillSlotId, SkillId>
): readonly SkillLineId[] {
  const skillLineIds = new Set<SkillLineId>()

  for (const slot of skillSlots.list) {
    const skillId = skillBar[slot.id]
    if (skillId === "no-skill") continue

    const skill = skills.data[skillId]
    if (skill) {
      skillLineIds.add(skill.skillLineId)
    }
  }

  return Array.from(skillLineIds)
}

export function countSlottedAbilitiesFromLine(
  skillBar: Record<SkillSlotId, SkillId>,
  skillLineId: SkillLineId
): number {
  let count = 0

  for (const slot of skillSlots.list) {
    const skillId = skillBar[slot.id]
    if (skillId === "no-skill") continue

    const skill = skills.data[skillId]
    if (skill && skill.skillLineId === skillLineId) {
      count++
    }
  }

  return count
}

export function countArmorPiecesByWeight(armor: ArmorShape): Record<StandardArmorWeightId, number> {
  const counts: Record<StandardArmorWeightId, number> = {
    "no-weight": 0,
    light: 0,
    medium: 0,
    heavy: 0,
  }

  for (const slot of Object.values(armor)) {
    if (slot.itemType === "armor" && slot.data.weight !== "no-weight") {
      counts[slot.data.weight]++
    }
  }

  return counts
}

export function getWeaponTypeIdsForBar(weaponBar: WeaponBarShape): readonly string[] {
  const typeIds: string[] = []

  const mainHand = weaponBar["main-hand"]
  if (mainHand.itemType === "weapon" && mainHand.data.type !== "no-type") {
    typeIds.push(mainHand.data.type)
  }

  const offHand = weaponBar["off-hand"]
  if (offHand.itemType === "weapon" && offHand.data.type !== "no-type") {
    const weaponType = weaponTypes.data[offHand.data.type]
    if (weaponType && !weaponType.isTwoHanded) {
      typeIds.push(offHand.data.type)
    }
  }

  return typeIds
}

export function getSkillLineCategory(skillLineId: SkillLineId): SkillLineCategoryId {
  const skillLine = skillLines.data[skillLineId]
  return skillLine?.subcategoryId ?? "none"
}
