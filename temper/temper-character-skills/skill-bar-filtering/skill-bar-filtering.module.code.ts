import { classes } from "@akasha/temper-classes/character-class"
import type { SkillLineId } from "@akasha/temper-skill-lines/skill-lines"
import type { Skill } from "../character-skills/character-skills.module.code.ts"

export function filterSkillsForBar(
  allSkills: readonly Skill[],
  isUltimate: boolean,
  barType: "primary" | "backup",
  options: {
    primaryBarWeaponSkillLineIds: readonly SkillLineId[]
    backupBarWeaponSkillLineIds: readonly SkillLineId[]
    availableArmorSkillLineIds: readonly SkillLineId[]
    characterSkillLineIds: readonly SkillLineId[]
    curseState: string | null
  }
): readonly Skill[] {
  const {
    primaryBarWeaponSkillLineIds,
    backupBarWeaponSkillLineIds,
    availableArmorSkillLineIds,
    characterSkillLineIds,
    curseState,
  } = options

  const barWeaponSkillLineIds =
    barType === "primary" ? primaryBarWeaponSkillLineIds : backupBarWeaponSkillLineIds

  return allSkills.filter((skill) => {
    if (isUltimate && skill.skillType !== "ultimate") return false
    if (!isUltimate && skill.skillType === "ultimate") return false

    if (skill.skillType === "passive") return false

    const skillLineId = skill.skillLineId

    if (skillLineId.startsWith("weapon-")) {
      if (!barWeaponSkillLineIds.includes(skillLineId)) {
        return false
      }
    }

    if (skillLineId.startsWith("armor-")) {
      if (!availableArmorSkillLineIds.includes(skillLineId)) {
        return false
      }
    }

    const isGuild = skillLineId.startsWith("guild-")
    const isAllianceWar = skillLineId.startsWith("alliance-war-")
    const isSoulMagic = skillLineId === "world-soul-magic"

    if (isGuild || isAllianceWar || isSoulMagic) {
      return true
    }

    const isClassSkill = classes.list.some((c) => skillLineId.startsWith(`${c.id}-`))
    if (isClassSkill) {
      if (!characterSkillLineIds.includes(skillLineId)) {
        return false
      }
    }

    if (skillLineId === "world-vampire" && curseState !== "vampire") {
      return false
    }

    if (skillLineId === "world-werewolf") {
      if (curseState !== "werewolf") {
        return false
      }
      if (!isUltimate) {
        return false
      }
    }

    return true
  })
}
