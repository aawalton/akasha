import type { SkillLineProgress } from "@akasha/temper-completion/completion-progress"
import { getSavedVariables } from "@akasha/temper-player-completion-state/completion-saved-variables"

export function saveMorphsForSkillLine(
  skillLineEntry: SkillLineProgress,
  skillType: number,
  lineIndex: number
): undefined {
  const numAbilities = GetNumSkillAbilities(skillType, lineIndex)

  for (let abilityIndex = 1; abilityIndex <= numAbilities; abilityIndex++) {
    const [name, , , passive, ultimate, , progressionIndex] = GetSkillAbilityInfo(
      skillType,
      lineIndex,
      abilityIndex
    )
    if (name === "" || passive || progressionIndex === undefined || progressionIndex <= 0) continue

    const [progName, currentMorph] = GetAbilityProgressionInfo(progressionIndex)
    if (progName === "") continue

    const baseId = GetAbilityProgressionAbilityId(progressionIndex, 0, 1)
    const morph1Id = GetAbilityProgressionAbilityId(progressionIndex, 1, 1)
    const morph2Id = GetAbilityProgressionAbilityId(progressionIndex, 2, 1)
    if (morph1Id === 0) continue

    const [baseName] = GetAbilityProgressionAbilityInfo(progressionIndex, 0, 1)
    const [morph1Name] = GetAbilityProgressionAbilityInfo(progressionIndex, 1, 1)
    const [morph2Name] = GetAbilityProgressionAbilityInfo(progressionIndex, 2, 1)

    if (skillLineEntry.skills === undefined) {
      skillLineEntry.skills = {}
    }

    const existing = skillLineEntry.skills[baseId]

    const apiBaseRank = GetAbilityProgressionRankFromAbilityId(baseId)
    const apiMorph1Rank = GetAbilityProgressionRankFromAbilityId(morph1Id)
    const apiMorph2Rank = GetAbilityProgressionRankFromAbilityId(morph2Id)

    const [, , , , , baseAtMorph] = GetAbilityProgressionXPInfoFromAbilityId(baseId)

    let baseRank: number | undefined = math.max(existing?.base.rank ?? 0, apiBaseRank ?? 0)
    let morph1Rank: number | undefined = math.max(existing?.morph1.rank ?? 0, apiMorph1Rank ?? 0)
    let morph2Rank: number | undefined = math.max(existing?.morph2.rank ?? 0, apiMorph2Rank ?? 0)

    if (currentMorph > 0) {
      baseRank = 4
    }

    if (baseRank === 0 && apiBaseRank === undefined && existing?.base.rank === undefined) {
      baseRank = undefined
    }
    if (morph1Rank === 0 && apiMorph1Rank === undefined && existing?.morph1.rank === undefined) {
      morph1Rank = undefined
    }
    if (morph2Rank === 0 && apiMorph2Rank === undefined && existing?.morph2.rank === undefined) {
      morph2Rank = undefined
    }

    skillLineEntry.skills[baseId] = {
      base: {
        name: baseName,
        rank: baseRank,
      },
      morph1: {
        name: morph1Name,
        rank: morph1Rank,
      },
      morph2: {
        name: morph2Name,
        rank: morph2Rank,
      },
      currentMorph,
      abilityIndex,
      isUltimate: ultimate,
      atMorph: existing?.atMorph === true || baseAtMorph || currentMorph > 0,
    }
  }
}

export function saveAccountSkillMorphProgress(): undefined {
  const savedVars = getSavedVariables()
  if (savedVars.account.subclassingSkillLineProgress === undefined) return

  const numLines = GetNumSkillLines(SKILL_TYPE_CLASS)
  for (let lineIndex = 1; lineIndex <= numLines; lineIndex++) {
    const [, , , , isAccountSkill] = GetSkillLineDynamicInfo(SKILL_TYPE_CLASS, lineIndex)
    if (!isAccountSkill) continue

    const skillLineData = SKILLS_DATA_MANAGER.GetSkillLineDataByIndices(SKILL_TYPE_CLASS, lineIndex)
    if (!skillLineData?.IsDiscovered()) continue

    const [name, , , skillLineId] = GetSkillLineInfo(SKILL_TYPE_CLASS, lineIndex)
    if (name === undefined || name === "" || skillLineId === undefined || skillLineId === 0)
      continue

    const entry = savedVars.account.subclassingSkillLineProgress[skillLineId]
    if (entry === undefined) continue

    saveMorphsForSkillLine(entry, SKILL_TYPE_CLASS, lineIndex)
  }
}

export function updateAccountSkillMorphProgress(
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

  const entry = savedVars.account.subclassingSkillLineProgress[skillLineId]
  if (entry === undefined) return

  saveMorphsForSkillLine(entry, skillType, skillLineIndex)
}

export function saveSkillMorphProgress(): undefined {
  const savedVars = getSavedVariables()
  const charEntry = savedVars.characters[GetCurrentCharacterId()]
  if (charEntry?.skillLineProgress === undefined) return

  const numSkillTypes = GetNumSkillTypes()
  for (let skillType = 1; skillType <= numSkillTypes; skillType++) {
    const numLines = GetNumSkillLines(skillType)
    for (let lineIndex = 1; lineIndex <= numLines; lineIndex++) {
      const skillLineData = SKILLS_DATA_MANAGER.GetSkillLineDataByIndices(skillType, lineIndex)
      if (!skillLineData?.IsDiscovered()) continue

      const [name, , , skillLineId] = GetSkillLineInfo(skillType, lineIndex)
      if (name === undefined || name === "" || skillLineId === undefined || skillLineId === 0)
        continue

      const entry = charEntry.skillLineProgress[skillLineId]
      if (entry === undefined) continue

      saveMorphsForSkillLine(entry, skillType, lineIndex)
    }
  }
}

export function updateSkillMorphProgress(skillType: number, skillLineIndex: number): undefined {
  const savedVars = getSavedVariables()
  const charEntry = savedVars.characters[GetCurrentCharacterId()]
  if (charEntry?.skillLineProgress === undefined) return

  const skillLineData = SKILLS_DATA_MANAGER.GetSkillLineDataByIndices(skillType, skillLineIndex)
  if (!skillLineData?.IsDiscovered()) return

  const [name, , , skillLineId] = GetSkillLineInfo(skillType, skillLineIndex)
  if (name === undefined || name === "" || skillLineId === undefined || skillLineId === 0) return

  const entry = charEntry.skillLineProgress[skillLineId]
  if (entry === undefined) return

  saveMorphsForSkillLine(entry, skillType, skillLineIndex)
}
