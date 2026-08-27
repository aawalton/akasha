import type { SkillLineProgress } from "@temper/game-completion/completion-types"
import { getSavedVariables } from "../saved-variables"
import { mergeSkillLineProgress } from "./skill-lines-merge"

export function updateSkillLineProgress(skillType: number, skillLineIndex: number): undefined {
  const savedVars = getSavedVariables()
  const charEntry = savedVars.characters[GetCurrentCharacterId()]
  if (charEntry?.skillLineProgress === undefined) return

  const skillLineData = SKILLS_DATA_MANAGER.GetSkillLineDataByIndices(skillType, skillLineIndex)
  if (!skillLineData?.IsDiscovered()) return

  const [name, , , skillLineId] = GetSkillLineInfo(skillType, skillLineIndex)
  if (name === undefined || name === "" || skillLineId === undefined || skillLineId === 0) return

  const currentRankXP = skillLineData.GetCurrentRankXP()
  const lastRankXP = skillLineData.GetLastRankXP()

  charEntry.skillLineProgress[skillLineId] = {
    currentRank: skillLineData.GetCurrentRank(),
    currentXP: currentRankXP - lastRankXP,
    nextRankXP: skillLineData.GetNextRankXP() - lastRankXP,
  }
}

export function updateAccountSkillLineProgress(
  skillType: number,
  skillLineIndex: number
): undefined {
  const savedVars = getSavedVariables()
  if (savedVars.account.subclassingSkillLineProgress === undefined) return

  const [, , , , isAccountSkill] = GetSkillLineDynamicInfo(skillType, skillLineIndex)
  if (!isAccountSkill) return

  const skillLineData = SKILLS_DATA_MANAGER.GetSkillLineDataByIndices(skillType, skillLineIndex)
  if (!skillLineData?.IsDiscovered()) return

  const [name, , , skillLineId] = GetSkillLineInfo(skillType, skillLineIndex)
  if (name === undefined || name === "" || skillLineId === undefined || skillLineId === 0) return

  const currentRankXP = skillLineData.GetCurrentRankXP()
  const lastRankXP = skillLineData.GetLastRankXP()

  savedVars.account.subclassingSkillLineProgress[skillLineId] = {
    currentRank: skillLineData.GetCurrentRank(),
    currentXP: currentRankXP - lastRankXP,
    nextRankXP: skillLineData.GetNextRankXP() - lastRankXP,
  }
}

export function scanAccountSkillLineProgress(): Record<number, SkillLineProgress> {
  const scanned: Record<number, SkillLineProgress> = {}
  const numLines = GetNumSkillLines(SKILL_TYPE_CLASS)

  for (let lineIndex = 1; lineIndex <= numLines; lineIndex++) {
    const [, , , , isAccountSkill] = GetSkillLineDynamicInfo(SKILL_TYPE_CLASS, lineIndex)
    if (!isAccountSkill) continue

    const skillLineData = SKILLS_DATA_MANAGER.GetSkillLineDataByIndices(SKILL_TYPE_CLASS, lineIndex)
    if (!skillLineData?.IsDiscovered()) continue

    const [name, , , skillLineId] = GetSkillLineInfo(SKILL_TYPE_CLASS, lineIndex)
    if (name === undefined || name === "" || skillLineId === undefined || skillLineId === 0)
      continue

    const currentRankXP = skillLineData.GetCurrentRankXP()
    const lastRankXP = skillLineData.GetLastRankXP()

    scanned[skillLineId] = {
      currentRank: skillLineData.GetCurrentRank(),
      currentXP: currentRankXP - lastRankXP,
      nextRankXP: skillLineData.GetNextRankXP() - lastRankXP,
    }
  }

  return scanned
}

export function saveAccountSkillLineProgress(): undefined {
  const savedVars = getSavedVariables()

  savedVars.account.subclassingSkillLineProgress = mergeSkillLineProgress(
    savedVars.account.subclassingSkillLineProgress,
    scanAccountSkillLineProgress()
  )
}

export function scanSkillLineProgress(): Record<number, SkillLineProgress> {
  const scanned: Record<number, SkillLineProgress> = {}
  const numSkillTypes = GetNumSkillTypes()

  for (let skillType = 1; skillType <= numSkillTypes; skillType++) {
    const numLines = GetNumSkillLines(skillType)

    for (let lineIndex = 1; lineIndex <= numLines; lineIndex++) {
      const skillLineData = SKILLS_DATA_MANAGER.GetSkillLineDataByIndices(skillType, lineIndex)
      if (!skillLineData?.IsDiscovered()) continue

      const [name, , , skillLineId] = GetSkillLineInfo(skillType, lineIndex)
      if (name === undefined || name === "" || skillLineId === undefined || skillLineId === 0)
        continue

      const currentRankXP = skillLineData.GetCurrentRankXP()
      const lastRankXP = skillLineData.GetLastRankXP()

      scanned[skillLineId] = {
        currentRank: skillLineData.GetCurrentRank(),
        currentXP: currentRankXP - lastRankXP,
        nextRankXP: skillLineData.GetNextRankXP() - lastRankXP,
      }
    }
  }

  return scanned
}

export function saveSkillLineProgress(): undefined {
  const savedVars = getSavedVariables()
  const charEntry = savedVars.characters[GetCurrentCharacterId()]
  if (charEntry === undefined) return

  charEntry.skillLineProgress = mergeSkillLineProgress(
    charEntry.skillLineProgress,
    scanSkillLineProgress()
  )
}
