import { armorWeights } from "@akasha/temper-characters-equipment/armor-weights"
import { weaponTypes } from "@akasha/temper-characters-equipment/weapon-types-data"
import { classes } from "@akasha/temper-classes/character-class"
import type { ArmorWeightId } from "@akasha/temper-equipment/armor-weight-ids"
import type { ClassId } from "@akasha/temper-formula-framework/class-id"
import { valuesOf } from "@akasha/temper-formula-framework/record-parts"
import { type SkillBarId, skillBars } from "@akasha/temper-skill-kinds/skill-bars"
import { type SkillSlotId, skillSlots } from "@akasha/temper-skill-kinds/skill-slots"
import {
  getSkillLineIdsForClass,
  type SkillLineId,
  skillLines,
} from "@akasha/temper-skill-lines/skill-lines"
import { requireGet } from "@akasha/utils-narrow/require-get"
import type { Skill } from "../character-skills/character-skills.module.code.ts"
import { findSkillById } from "../find-skill-by-id/find-skill-by-id.module.code.ts"
import type {
  ArmorShape,
  SkillBarsState,
  WeaponBarShape,
} from "../query-shapes/query-shapes.module.code.ts"

export function getAvailableSkillLinesGrouped(
  playerClass: ClassId,
  currentSkillLineIds: readonly SkillLineId[],
  slotIndex: number
): readonly { classId: ClassId; className: string; skillLineIds: readonly SkillLineId[] }[] {
  const playerClassLineIds: readonly SkillLineId[] = getSkillLineIdsForClass(playerClass)

  const otherSlots = currentSkillLineIds
    .filter((_, i) => i !== slotIndex)
    .filter((lineId) => lineId !== "no-skill-line")
  const playerClassLinesInOtherSlots = otherSlots.filter((lineId) =>
    playerClassLineIds.includes(lineId)
  ).length

  const mustBePlayerClass = playerClassLineIds.length > 0 && playerClassLinesInOtherSlots === 0

  const groupedByClass = new Map<ClassId, SkillLineId[]>()

  for (const classId of classes.ids) {
    if (classId === "no-class") continue

    const isPlayerClass = classId === playerClass
    const classLineIds: readonly SkillLineId[] = getSkillLineIdsForClass(classId)

    const countFromThisClassInOtherSlots = otherSlots.filter((lineId) =>
      classLineIds.includes(lineId)
    ).length

    const availableFromClass: SkillLineId[] = []

    for (const lineId of classLineIds) {
      if (otherSlots.some((id) => id === lineId)) continue

      if (mustBePlayerClass && !isPlayerClass) continue

      if (!isPlayerClass && countFromThisClassInOtherSlots >= 1) continue

      availableFromClass.push(lineId)
    }

    if (availableFromClass.length > 0) {
      groupedByClass.set(classId, [...availableFromClass].sort())
    }
  }

  return Array.from(groupedByClass.entries())
    .map(([classId, skillLineIds]) => ({
      classId,
      className: classes.data[classId].name,
      skillLineIds,
    }))
    .sort((a, b) => a.className.localeCompare(b.className))
}

export function getClassForSkillLine(skillLineId: SkillLineId): ClassId | null {
  for (const classId of classes.ids) {
    const classLineIds: readonly SkillLineId[] = getSkillLineIdsForClass(classId)
    if (classLineIds.includes(skillLineId)) {
      return classId
    }
  }
  return null
}

export function validateSkillLinesForClass(newClass: ClassId): readonly SkillLineId[] {
  if (newClass === "no-class") {
    return ["no-skill-line", "no-skill-line", "no-skill-line"]
  }

  const classLineIds: readonly SkillLineId[] = getSkillLineIdsForClass(newClass)
  return [...classLineIds]
}

export function getSkillsToRemoveOnClassChange(
  currentSkills: SkillBarsState,
  currentEquippedSkillLineIds: readonly string[],
  newSkillLineIds: readonly string[],
  availableSkills: readonly Skill[],
  scribedSkillDefinitions: readonly Skill[] = []
): readonly { barId: SkillBarId; slotId: SkillSlotId; skill: Skill }[] {
  const skillLineIdsToRemove = currentEquippedSkillLineIds.filter(
    (lineId) => !newSkillLineIds.includes(lineId)
  )

  if (skillLineIdsToRemove.length === 0) {
    return []
  }

  const skillsToRemove: { barId: SkillBarId; slotId: SkillSlotId; skill: Skill }[] = []

  for (const barId of skillBars.ids) {
    const skillBar = currentSkills[barId]
    if (!skillBar) continue

    for (const slot of skillSlots.list) {
      const skillId = skillBar[slot.id]
      if (skillId === "") continue

      const skill = findSkillById(skillId, availableSkills, scribedSkillDefinitions)
      if (!skill) continue

      if (skillLineIdsToRemove.includes(skill.skillLineId)) {
        skillsToRemove.push({ barId, slotId: slot.id, skill })
      }
    }
  }

  return skillsToRemove
}

export function getWeaponSkillLineIdsForBar(bar: WeaponBarShape): readonly SkillLineId[] {
  const skillLineIds: SkillLineId[] = []

  const mainHand = bar["main-hand"]
  const offHand = bar["off-hand"]

  const mainHandTypeId = mainHand.itemType === "weapon" ? mainHand.data.type : null

  if (mainHandTypeId == null) return skillLineIds

  const mainHandSkillLineId = weaponTypes.data[mainHandTypeId].skillLineId

  if (
    mainHandSkillLineId === "weapon-two-handed" ||
    mainHandSkillLineId === "weapon-bow" ||
    mainHandSkillLineId === "weapon-destruction-staff" ||
    mainHandSkillLineId === "weapon-restoration-staff"
  ) {
    skillLineIds.push(mainHandSkillLineId)
  } else if (mainHandSkillLineId === "weapon-one-hand") {
    if (offHand.itemType === "shield") {
      skillLineIds.push("weapon-one-hand-and-shield")
    } else if (
      offHand.itemType === "weapon" &&
      offHand.data.type !== "no-type" &&
      !weaponTypes.data[offHand.data.type].isTwoHanded
    ) {
      skillLineIds.push("weapon-dual-wield")
    } else if (
      offHand.itemType === "empty" ||
      (offHand.itemType === "weapon" && offHand.data.type === "no-type")
    ) {
      skillLineIds.push("weapon-one-hand-and-shield")
      skillLineIds.push("weapon-dual-wield")
    }
  }

  return skillLineIds
}

export function getArmorSkillLineIds(armor: ArmorShape): readonly SkillLineId[] {
  const weightCounts = new Map<ArmorWeightId, number>()
  for (const weightId of armorWeights.ids) {
    weightCounts.set(weightId, 0)
  }

  for (const slot of valuesOf(armor)) {
    if (
      slot.itemType === "armor" &&
      slot.data.weight != null &&
      weightCounts.has(slot.data.weight)
    ) {
      weightCounts.set(
        slot.data.weight,
        requireGet(weightCounts, slot.data.weight, "weightCounts") + 1
      )
    }
  }

  const availableSkillLineIds: SkillLineId[] = []

  for (const weightId of armorWeights.ids) {
    if (requireGet(weightCounts, weightId, "weightCounts") >= 5) {
      const skillLineId = armorWeights.data[weightId].skillLineId
      if (skillLineId !== "no-skill-line") {
        availableSkillLineIds.push(skillLineId)
      }
    }
  }

  return availableSkillLineIds
}

export function getSkillCategory(skillLineId: SkillLineId): string {
  const metadata = skillLines.data[skillLineId]

  if (metadata.subcategoryId === "class") return "Class"

  const categoryMap: Record<string, string> = {
    weapon: "Weapon",
    armor: "Armor",
    guild: "Guild",
    "alliance-war": "Alliance War",
    world: "World",
    racial: "Racial",
    craft: "Craft",
  }

  return categoryMap[metadata.subcategoryId] ?? "Other"
}

export function getSkillLineName(skillLineId: SkillLineId): string {
  return skillLines.data[skillLineId].name
}

export function getSkillLineOrder(
  skillLineId: SkillLineId,
  equippedSkillLineIds: readonly SkillLineId[]
): number {
  const metadata = skillLines.data[skillLineId]
  if (metadata.subcategoryId === "class") {
    const equippedIndex = equippedSkillLineIds.indexOf(skillLineId)
    return equippedIndex >= 0 ? equippedIndex : 999
  }

  return metadata.displayOrder
}
