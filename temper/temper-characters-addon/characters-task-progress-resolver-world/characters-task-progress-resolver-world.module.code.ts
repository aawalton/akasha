import { ALL_COMPANION_IDS } from "@akasha/temper-companions-addon/companions-id-map"
import type { AccountCompletion } from "@akasha/temper-completion/completion-record"
import { COMPANION_QUEST_DATA } from "@akasha/temper-player-completion/companion-quest-data"
import {
  clampRapportProgress,
  MAX_COMPANION_RAPPORT,
} from "@akasha/temper-player-completion/companion-rapport"
import { countLoreLibrary } from "@akasha/temper-player-completion/completion-lore-library-progress"
import type { SavedCharacterEntry } from "@akasha/temper-player-completion-state/completion-saved-variables"
import type { TaskProgress } from "@akasha/temper-player-completion-state/completion-task-progress"
import { tallyPathScopedLeaves } from "../characters-progress-tally/characters-progress-tally.module.code.ts"

const ALL_COMPANION_ID_SET = new Set<number>(ALL_COMPANION_IDS)
const TOTAL_RAPPORT = ALL_COMPANION_IDS.length * MAX_COMPANION_RAPPORT

export function resolveMountTraining(
  charData: SavedCharacterEntry | undefined,
  itemPath: (string | number)[] | undefined
): TaskProgress | undefined {
  const mt = charData?.mountTraining
  if (mt === undefined) return undefined

  if (itemPath !== undefined && itemPath.length > 0) {
    const stat = String(itemPath[0])
    if (stat === "speed") return { current: mt.speed, total: mt.maxSpeed }
    if (stat === "stamina") return { current: mt.stamina, total: mt.maxStamina }
    if (stat === "carryCapacity") return { current: mt.carryCapacity, total: mt.maxCarryCapacity }
    return undefined
  }

  const current = mt.speed + mt.stamina + mt.carryCapacity
  const total = mt.maxSpeed + mt.maxStamina + mt.maxCarryCapacity
  return { current, total }
}

export function resolveTraitResearch(
  charData: SavedCharacterEntry | undefined,
  itemPath: (string | number)[] | undefined
): TaskProgress | undefined {
  const tr = charData?.traitResearch
  if (tr === undefined) return undefined
  return tallyPathScopedLeaves(
    tr,
    (craftType) => craftType.lines,
    (line) => line.traits,
    (trait) => trait.known,
    itemPath
  )
}

export function resolveCadwell(
  charData: SavedCharacterEntry | undefined,
  itemPath: (string | number)[] | undefined
): TaskProgress | undefined {
  const cadwell = charData?.cadwell
  if (cadwell === undefined) return undefined
  return tallyPathScopedLeaves(
    cadwell.levels,
    (level) => level.zones,
    (zone) => zone.pois,
    (poi) => poi.completed,
    itemPath
  )
}

export function resolveCompanionQuests(
  charData: SavedCharacterEntry | undefined,
  itemPath: (string | number)[] | undefined
): TaskProgress | undefined {
  const quests = charData?.quests
  if (quests === undefined) return undefined
  const completedIds = new Set<number>(quests)

  if (itemPath !== undefined && itemPath.length > 0) {
    const companionId = itemPath[0]
    if (typeof companionId !== "string") return undefined
    const group = COMPANION_QUEST_DATA.find((g) => g.companionId === companionId)
    if (group === undefined) return undefined
    let current = 0
    for (const q of group.quests) {
      if (completedIds.has(q.questId)) current++
    }
    return { current, total: group.quests.length }
  }

  let current = 0
  let total = 0
  for (const group of COMPANION_QUEST_DATA) {
    for (const q of group.quests) {
      total++
      if (completedIds.has(q.questId)) current++
    }
  }
  return { current, total }
}

export function resolveCompanionRapport(
  charData: SavedCharacterEntry | undefined,
  itemPath: (string | number)[] | undefined
): TaskProgress | undefined {
  const rapport = charData?.companionRapport

  if (itemPath !== undefined && itemPath.length > 0) {
    const companionId = itemPath[0]
    if (typeof companionId !== "number") return undefined
    return {
      current: clampRapportProgress(rapport?.[companionId] ?? 0),
      total: MAX_COMPANION_RAPPORT,
    }
  }

  let current = 0
  if (rapport !== undefined) {
    for (const [idKey, level] of Object.entries(rapport)) {
      if (ALL_COMPANION_ID_SET.has(Number(idKey))) current += clampRapportProgress(level)
    }
  }
  return { current, total: TOTAL_RAPPORT }
}

export function resolveLoreLibrary(
  charData: SavedCharacterEntry | undefined,
  itemPath: (string | number)[] | undefined
): TaskProgress | undefined {
  const ll = charData?.loreLibrary
  if (ll === undefined) return undefined
  const counted = countLoreLibrary(ll, itemPath)
  if (counted.total === 0) return undefined
  return counted
}

export function resolveAntiquityLore(account: AccountCompletion): TaskProgress | undefined {
  const antiquityLore = account.antiquityLore
  if (antiquityLore === undefined) return undefined

  let current = 0
  let total = 0

  let antiquityId = GetNextAntiquityId(undefined)
  while (antiquityId !== undefined && antiquityId !== 0) {
    const loreEntries = GetNumAntiquityLoreEntries(antiquityId)
    if (loreEntries > 0) {
      total += loreEntries
      const acquired = antiquityLore[antiquityId]
      if (acquired !== undefined) {
        current += acquired
      }
    }
    antiquityId = GetNextAntiquityId(antiquityId)
  }

  if (total === 0) return undefined
  return { current, total }
}
