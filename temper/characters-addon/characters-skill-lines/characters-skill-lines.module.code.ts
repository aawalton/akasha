import type { SkillLineProgress } from "@akasha/temper-completion/completion-progress"
import { getSavedVariables } from "@akasha/temper-player-completion-state/completion-saved-variables"
import { currentCharacterEntry } from "../characters-current-entry/characters-current-entry.module.code.ts"
import { mergeSkillLineProgress } from "../characters-skill-lines-merge/characters-skill-lines-merge.module.code.ts"

interface DiscoveredSkillLine {
  id: number
  progress: SkillLineProgress
}

function readSkillLine(skillType: number, skillLineIndex: number): DiscoveredSkillLine | undefined {
  const skillLineData = SKILLS_DATA_MANAGER.GetSkillLineDataByIndices(skillType, skillLineIndex)
  if (!skillLineData?.IsDiscovered()) return undefined

  const [name, , , skillLineId] = GetSkillLineInfo(skillType, skillLineIndex)
  if (name === undefined || name === "" || skillLineId === undefined || skillLineId === 0) {
    return undefined
  }

  const currentRankXP = skillLineData.GetCurrentRankXP()
  const lastRankXP = skillLineData.GetLastRankXP()

  return {
    id: skillLineId,
    progress: {
      currentRank: skillLineData.GetCurrentRank(),
      currentXP: currentRankXP - lastRankXP,
      nextRankXP: skillLineData.GetNextRankXP() - lastRankXP,
    },
  }
}

function isAccountSkillLine(skillType: number, skillLineIndex: number): boolean {
  const [, , , , isAccountSkill] = GetSkillLineDynamicInfo(skillType, skillLineIndex)
  return isAccountSkill
}

export function updateSkillLineProgress(skillType: number, skillLineIndex: number): undefined {
  const skillLineProgress = currentCharacterEntry()?.skillLineProgress
  if (skillLineProgress === undefined) return

  const line = readSkillLine(skillType, skillLineIndex)
  if (line === undefined) return

  skillLineProgress[line.id] = line.progress
}

export function updateAccountSkillLineProgress(
  skillType: number,
  skillLineIndex: number
): undefined {
  const accountProgress = getSavedVariables().account.subclassingSkillLineProgress
  if (accountProgress === undefined) return
  if (!isAccountSkillLine(skillType, skillLineIndex)) return

  const line = readSkillLine(skillType, skillLineIndex)
  if (line === undefined) return

  accountProgress[line.id] = line.progress
}

export function scanAccountSkillLineProgress(): Record<number, SkillLineProgress> {
  const scanned: Record<number, SkillLineProgress> = {}
  const numLines = GetNumSkillLines(SKILL_TYPE_CLASS)

  for (let lineIndex = 1; lineIndex <= numLines; lineIndex++) {
    if (!isAccountSkillLine(SKILL_TYPE_CLASS, lineIndex)) continue

    const line = readSkillLine(SKILL_TYPE_CLASS, lineIndex)
    if (line === undefined) continue

    scanned[line.id] = line.progress
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
      const line = readSkillLine(skillType, lineIndex)
      if (line === undefined) continue

      scanned[line.id] = line.progress
    }
  }

  return scanned
}

export function saveSkillLineProgress(): undefined {
  const charEntry = currentCharacterEntry()
  if (charEntry === undefined) return

  charEntry.skillLineProgress = mergeSkillLineProgress(
    charEntry.skillLineProgress,
    scanSkillLineProgress()
  )
}
