import "@akasha/temper-eso-types/eso-api"
import "@akasha/temper-eso-types/eso-functions-01"
import "@akasha/temper-eso-types/eso-functions-04"
import "@akasha/temper-eso-types/eso-functions-05"
import "@akasha/temper-eso-types/eso-functions-07"
import {
  ensureCompanionEntry,
  type SavedCompanionEntry,
} from "../companions-saved-variables/companions-saved-variables.module.code.ts"

export function getActiveCompanionEntry(): SavedCompanionEntry | undefined {
  if (!HasActiveCompanion()) return undefined
  return ensureCompanionEntry(GetActiveCompanionDefId())
}

export function collectCompanionSkillLines(entry: SavedCompanionEntry): undefined {
  if (!AreCompanionSkillsInitialized()) return

  entry.skillLineProgress = {}
  const numSkillTypes = GetNumSkillTypes()

  for (let skillType = 1; skillType <= numSkillTypes; skillType++) {
    const numLines = GetNumCompanionSkillLines(skillType)

    for (let lineIndex = 1; lineIndex <= numLines; lineIndex++) {
      const skillLineId = GetCompanionSkillLineId(skillType, lineIndex)
      if (skillLineId === 0) continue

      const [rank, , discovered] = GetCompanionSkillLineDynamicInfo(skillLineId)
      if (!discovered) continue

      const [lastRankXP, nextRankXP, currentXP] = GetCompanionSkillLineXPInfo(skillLineId)

      entry.skillLineProgress[skillLineId] = {
        currentRank: rank,
        currentXP: currentXP - lastRankXP,
        nextRankXP: nextRankXP - lastRankXP,
      }
    }
  }
}

export function collectCompanionProgress(): undefined {
  const entry = getActiveCompanionEntry()
  if (entry === undefined) return

  const [level, currentXP] = GetActiveCompanionLevelInfo()
  entry.level = level
  entry.currentXP = currentXP

  const rawRapport = GetActiveCompanionRapport()
  entry.rapport = rawRapport

  const charEntry = TemperCharacters.getSavedVariables().characters[GetCurrentCharacterId()]
  if (charEntry !== undefined) {
    if (charEntry.companionRapport === undefined) charEntry.companionRapport = {}
    charEntry.companionRapport[GetActiveCompanionDefId()] = rawRapport
  }

  collectCompanionSkillLines(entry)
}

export function updateCompanionExperience(level: number, currentXP: number): undefined {
  const entry = getActiveCompanionEntry()
  if (entry === undefined) return

  entry.level = level
  entry.currentXP = currentXP
}

export function updateCompanionRapport(currentRapport: number): undefined {
  const entry = getActiveCompanionEntry()
  if (entry === undefined) return

  entry.rapport = currentRapport

  const charEntry = TemperCharacters.getSavedVariables().characters[GetCurrentCharacterId()]
  if (charEntry !== undefined) {
    if (charEntry.companionRapport === undefined) charEntry.companionRapport = {}
    charEntry.companionRapport[GetActiveCompanionDefId()] = currentRapport
  }
}

export function handleCompanionRapportUpdate(currentRapport: number): undefined {
  updateCompanionRapport(currentRapport)
  TemperCharacters.scheduleTaskAutoCompletionCheck()
}

export function updateCompanionSkillLine(skillLineId: number): undefined {
  const entry = getActiveCompanionEntry()
  if (entry === undefined) return
  if (entry.skillLineProgress === undefined) return

  const [rank, , discovered] = GetCompanionSkillLineDynamicInfo(skillLineId)
  if (!discovered) return

  const [lastRankXP, nextRankXP, currentXP] = GetCompanionSkillLineXPInfo(skillLineId)

  entry.skillLineProgress[skillLineId] = {
    currentRank: rank,
    currentXP: currentXP - lastRankXP,
    nextRankXP: nextRankXP - lastRankXP,
  }
}

export function addCompanionSkillLine(skillLineId: number): undefined {
  const entry = getActiveCompanionEntry()
  if (entry === undefined) return

  if (entry.skillLineProgress === undefined) {
    entry.skillLineProgress = {}
  }

  const [rank, , discovered] = GetCompanionSkillLineDynamicInfo(skillLineId)
  if (!discovered) return

  const [lastRankXP, nextRankXP, currentXP] = GetCompanionSkillLineXPInfo(skillLineId)

  entry.skillLineProgress[skillLineId] = {
    currentRank: rank,
    currentXP: currentXP - lastRankXP,
    nextRankXP: nextRankXP - lastRankXP,
  }
}

export function refreshAllCompanionSkillLines(): undefined {
  const entry = getActiveCompanionEntry()
  if (entry === undefined) return

  collectCompanionSkillLines(entry)
}
