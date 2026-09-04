import { getRacialSkillLineIdForRace } from "@akasha/temper-character-skills/passive-queries"
import { skillLineCategoriesSorted } from "@akasha/temper-skill-lines/skill-line-category-data"
import {
  getSkillLineIdsForClass,
  type SkillLineId,
  skillLines,
} from "@akasha/temper-skill-lines/skill-lines"
import type { CharacterSkillMorphProgress } from "@akasha/temper-skill-morphs/morph-progress-types"
import {
  buildMorphRankMap,
  getSkillLineMorphContribution,
} from "@akasha/temper-skill-morphs/skill-line-morph-totals"
import {
  EXCLUDED_CATEGORIES,
  EXCLUDED_SKILL_LINES,
} from "@akasha/temper-skill-morphs-access/eso-id-helpers"
import type { CharacterAchievementProgressResult } from "../completion-achievement-progress/completion-achievement-progress.module.code.ts"
import type { CharacterSummaryData } from "../completion-card-registry/completion-card-registry.module.code.ts"
import type {
  CharacterCadwellProgress,
  CharacterCompanionRapportProgress,
  CharacterDailyWritsProgress,
  CharacterLoreLibraryProgress,
  CharacterMountTrainingProgress,
  CharacterPackUpgradesProgress,
  CharacterPoiProgress,
  CharacterQuestProgress,
  CharacterRecipeProgress,
  CharacterScribingProgress,
  CharacterSkillLineProgress,
  CharacterSkillPointsProgress,
  CharacterTraitResearchProgress,
  CharacterZoneCompletionProgress,
  CompletionCharacter,
} from "../completion-ui-types/completion-ui-types.module.code.ts"

interface CharacterTotals {
  name: string
  level: number
  maxLevel: number
  allianceRank: number
  maxAllianceRank: number
  achievementsCount: number
  achievementsTotal: number
  cadwellCount: number
  cadwellTotal: number
  companionQuestsCount: number
  companionQuestsTotal: number
  companionRapportCount: number
  companionRapportTotal: number
  loreLibraryCount: number
  loreLibraryTotal: number
  skillLinesCount: number
  skillLinesTotal: number
  skillMorphsCount: number
  skillMorphsTotal: number
  recipesCount: number
  recipesTotal: number
  scribingCount: number
  scribingTotal: number
  traitCount: number
  traitTotal: number
  questsCount: number
  questsTotal: number
  skillPointsCount: number
  skillPointsTotal: number
  mountTrainingCount: number
  mountTrainingTotal: number
  packUpgradesCount: number
  packUpgradesTotal: number
  poiCount: number
  poiTotal: number
  zoneCompletionCount: number
  zoneCompletionTotal: number
  dailyWritsCount: number
  dailyWritsTotal: number
}

export interface CompletionProgressBundle {
  characters: readonly CompletionCharacter[]
  characterAchievementProgress: readonly CharacterAchievementProgressResult[]
  cadwellProgress: readonly CharacterCadwellProgress[]
  progress: readonly CharacterSkillLineProgress[]
  morphProgress: readonly CharacterSkillMorphProgress[]
  mountTrainingProgress: readonly CharacterMountTrainingProgress[]
  packUpgradesProgress: readonly CharacterPackUpgradesProgress[]
  recipeProgress: readonly CharacterRecipeProgress[]
  scribingProgress: readonly CharacterScribingProgress[]
  skillPointsProgress: readonly CharacterSkillPointsProgress[]
  traitResearchProgress: readonly CharacterTraitResearchProgress[]
  questProgress: readonly CharacterQuestProgress[]
  poiProgress: readonly CharacterPoiProgress[]
  zoneProgress: readonly CharacterZoneCompletionProgress[]
  companionQuestProgress: readonly CharacterQuestProgress[]
  companionRapportProgress: readonly CharacterCompanionRapportProgress[]
  loreLibraryProgress: readonly CharacterLoreLibraryProgress[]
  dailyWritsProgress: readonly CharacterDailyWritsProgress[]
  selectedCharacterIds?: readonly string[]
}

export function buildCharacterSummary(bundle: CompletionProgressBundle): CharacterSummaryData {
  const {
    characters,
    characterAchievementProgress: achievementProgress,
    cadwellProgress,
    progress,
    morphProgress,
    mountTrainingProgress,
    packUpgradesProgress,
    recipeProgress,
    scribingProgress,
    skillPointsProgress,
    traitResearchProgress,
    questProgress,
    poiProgress,
    zoneProgress,
    companionQuestProgress,
    companionRapportProgress,
    loreLibraryProgress,
    dailyWritsProgress,
    selectedCharacterIds,
  } = bundle
  const effectiveCharacters =
    selectedCharacterIds != null && selectedCharacterIds.length > 0
      ? characters.filter((c) => selectedCharacterIds.includes(c.id))
      : characters
  const charTotals = new Map<string, CharacterTotals>()
  for (const c of effectiveCharacters) {
    charTotals.set(c.id, {
      name: c.name,
      level: c.level,
      maxLevel: c.maxLevel,
      allianceRank: c.allianceRank,
      maxAllianceRank: c.maxAllianceRank,
      achievementsCount: 0,
      achievementsTotal: 0,
      cadwellCount: 0,
      cadwellTotal: 0,
      companionQuestsCount: 0,
      companionQuestsTotal: 0,
      companionRapportCount: 0,
      companionRapportTotal: 0,
      loreLibraryCount: 0,
      loreLibraryTotal: 0,
      skillLinesCount: 0,
      skillLinesTotal: 0,
      skillMorphsCount: 0,
      skillMorphsTotal: 0,
      recipesCount: 0,
      recipesTotal: 0,
      scribingCount: 0,
      scribingTotal: 0,
      traitCount: 0,
      traitTotal: 0,
      questsCount: 0,
      questsTotal: 0,
      skillPointsCount: 0,
      skillPointsTotal: 0,
      mountTrainingCount: 0,
      mountTrainingTotal: 0,
      packUpgradesCount: 0,
      packUpgradesTotal: 0,
      poiCount: 0,
      poiTotal: 0,
      zoneCompletionCount: 0,
      zoneCompletionTotal: 0,
      dailyWritsCount: 0,
      dailyWritsTotal: 0,
    })
  }

  for (const p of achievementProgress) {
    const totals = charTotals.get(p.characterId)
    if (!totals) continue
    totals.achievementsCount += p.earnedPoints
    totals.achievementsTotal += p.totalPoints
  }

  for (const p of cadwellProgress) {
    const totals = charTotals.get(p.characterId)
    if (!totals) continue
    totals.cadwellCount += p.completedCount
    totals.cadwellTotal += p.totalCount
  }

  const skillProgressMap = new Map<string, Map<string, { currentRank: number; maxRank: number }>>()
  for (const cp of progress) {
    const entries = new Map<string, { currentRank: number; maxRank: number }>()
    for (const e of cp.entries) {
      entries.set(e.skillLineId, { currentRank: e.currentRank, maxRank: e.maxRank })
    }
    skillProgressMap.set(cp.characterId, entries)
  }

  const morphRankMap = buildMorphRankMap(morphProgress)

  function addSkillPair(charId: string, slId: SkillLineId) {
    const totals = charTotals.get(charId)
    if (!totals) return
    const entry = skillProgressMap.get(charId)?.get(slId)
    totals.skillLinesCount += entry?.currentRank ?? 0
    totals.skillLinesTotal += entry?.maxRank ?? skillLines.data[slId].maxRank

    const morph = getSkillLineMorphContribution(charId, slId, morphRankMap)
    if (morph) {
      totals.skillMorphsCount += morph.count
      totals.skillMorphsTotal += morph.total
    }
  }

  for (const category of skillLineCategoriesSorted) {
    if (EXCLUDED_CATEGORIES.has(category.id)) continue

    if (category.id === "class") {
      for (const char of effectiveCharacters) {
        for (const slId of getSkillLineIdsForClass(char.classId)) {
          addSkillPair(char.id, slId)
        }
      }
    } else if (category.id === "racial") {
      for (const char of effectiveCharacters) {
        const slId = getRacialSkillLineIdForRace(char.raceId)
        if (slId != null && !EXCLUDED_SKILL_LINES.has(slId)) {
          addSkillPair(char.id, slId)
        }
      }
    } else {
      const categoryLines = skillLines.list.filter(
        (sl) => sl.subcategoryId === category.id && !EXCLUDED_SKILL_LINES.has(sl.id)
      )
      for (const sl of categoryLines) {
        for (const char of effectiveCharacters) {
          addSkillPair(char.id, sl.id)
        }
      }
    }
  }

  for (const cp of recipeProgress) {
    const totals = charTotals.get(cp.characterId)
    if (!totals) continue
    for (const entry of cp.entries) {
      totals.recipesCount += entry.knownCount
      totals.recipesTotal += entry.totalCount
    }
  }

  for (const cp of scribingProgress) {
    const totals = charTotals.get(cp.characterId)
    if (!totals) continue
    const categories = [cp.grimoires, cp.focusScripts, cp.signatureScripts, cp.affixScripts]
    for (const items of categories) {
      for (const item of items) {
        if (item.unlocked) totals.scribingCount++
        totals.scribingTotal++
      }
    }
  }

  for (const p of traitResearchProgress) {
    const totals = charTotals.get(p.characterId)
    if (!totals) continue
    totals.traitCount += p.knownCount
    totals.traitTotal += p.totalCount
  }

  for (const p of questProgress) {
    const totals = charTotals.get(p.characterId)
    if (!totals) continue
    totals.questsCount += p.completedCount
    totals.questsTotal += p.totalCount
  }

  for (const p of skillPointsProgress) {
    const totals = charTotals.get(p.characterId)
    if (!totals) continue
    totals.skillPointsCount += p.completedCount
    totals.skillPointsTotal += p.totalCount
  }

  for (const p of mountTrainingProgress) {
    const totals = charTotals.get(p.characterId)
    if (!totals) continue
    totals.mountTrainingCount += p.speed + p.stamina + p.carryCapacity
    totals.mountTrainingTotal += p.maxSpeed + p.maxStamina + p.maxCarryCapacity
  }

  for (const p of packUpgradesProgress) {
    const totals = charTotals.get(p.characterId)
    if (!totals) continue
    totals.packUpgradesCount += p.packUpgrades
    totals.packUpgradesTotal += p.maxPackUpgrades
  }

  for (const p of poiProgress) {
    const totals = charTotals.get(p.characterId)
    if (!totals) continue
    totals.poiCount += p.discoveredCount
    totals.poiTotal += p.totalCount
  }

  for (const p of zoneProgress) {
    const totals = charTotals.get(p.characterId)
    if (!totals) continue
    totals.zoneCompletionCount += p.completedCount
    totals.zoneCompletionTotal += p.totalCount
  }

  for (const p of companionQuestProgress) {
    const totals = charTotals.get(p.characterId)
    if (!totals) continue
    totals.companionQuestsCount += p.completedCount
    totals.companionQuestsTotal += p.totalCount
  }

  for (const p of companionRapportProgress) {
    const totals = charTotals.get(p.characterId)
    if (!totals) continue
    totals.companionRapportCount += p.completedCount
    totals.companionRapportTotal += p.totalCount
  }

  for (const p of loreLibraryProgress) {
    const totals = charTotals.get(p.characterId)
    if (!totals) continue
    totals.loreLibraryCount += p.knownCount
    totals.loreLibraryTotal += p.totalBooks
  }

  for (const p of dailyWritsProgress) {
    const totals = charTotals.get(p.characterId)
    if (!totals) continue
    totals.dailyWritsCount += p.completed
    totals.dailyWritsTotal += p.total
  }

  function sumAll(
    getCount: (t: CharacterTotals) => number,
    getTotal: (t: CharacterTotals) => number
  ): { count: number; total: number } {
    let count = 0
    let total = 0
    for (const t of charTotals.values()) {
      count += getCount(t)
      total += getTotal(t)
    }
    return { count, total }
  }

  return {
    "alliance-rank": sumAll(
      (t) => t.allianceRank,
      (t) => t.maxAllianceRank
    ),
    "character-achievements": sumAll(
      (t) => t.achievementsCount,
      (t) => t.achievementsTotal
    ),
    "cadwells-almanac": sumAll(
      (t) => t.cadwellCount,
      (t) => t.cadwellTotal
    ),
    "character-level": sumAll(
      (t) => t.level,
      (t) => t.maxLevel
    ),
    "companion-quests": sumAll(
      (t) => t.companionQuestsCount,
      (t) => t.companionQuestsTotal
    ),
    "daily-writs": sumAll(
      (t) => t.dailyWritsCount,
      (t) => t.dailyWritsTotal
    ),
    "companion-rapport-character": sumAll(
      (t) => t.companionRapportCount,
      (t) => t.companionRapportTotal
    ),
    "lore-library-character": sumAll(
      (t) => t.loreLibraryCount,
      (t) => t.loreLibraryTotal
    ),
    "recipes": sumAll(
      (t) => t.recipesCount,
      (t) => t.recipesTotal
    ),
    "trait-research": sumAll(
      (t) => t.traitCount,
      (t) => t.traitTotal
    ),
    "mount-training": sumAll(
      (t) => t.mountTrainingCount,
      (t) => t.mountTrainingTotal
    ),
    "pack-upgrades": sumAll(
      (t) => t.packUpgradesCount,
      (t) => t.packUpgradesTotal
    ),
    "points-of-interest": sumAll(
      (t) => t.poiCount,
      (t) => t.poiTotal
    ),
    "quests": sumAll(
      (t) => t.questsCount,
      (t) => t.questsTotal
    ),
    "skill-lines": sumAll(
      (t) => t.skillLinesCount,
      (t) => t.skillLinesTotal
    ),
    "skill-morphs": sumAll(
      (t) => t.skillMorphsCount,
      (t) => t.skillMorphsTotal
    ),
    "skill-points": sumAll(
      (t) => t.skillPointsCount,
      (t) => t.skillPointsTotal
    ),
    "scribing-knowledge": sumAll(
      (t) => t.scribingCount,
      (t) => t.scribingTotal
    ),
    "zone-completion": sumAll(
      (t) => t.zoneCompletionCount,
      (t) => t.zoneCompletionTotal
    ),
  } satisfies CharacterSummaryData
}
