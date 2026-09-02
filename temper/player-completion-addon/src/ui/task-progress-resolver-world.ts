import type { AccountCompletion } from "@akasha/temper-completion/completion-record"
import { loreLibraryData } from "@temper/game-completion/generated/lore-library-data.generated"
import { companionQuestData } from "@temper/player-completion/companion-quest-data"
import {
  clampRapportProgress,
  MAX_COMPANION_RAPPORT,
} from "@temper/player-completion/companion-rapport"
import { ALL_COMPANION_IDS } from "../generated/companion-mappings.generated"
import type { SavedCharacterEntry } from "../saved-variables"
import type { TaskProgress } from "./task-progress-resolver-types"

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

  let current = 0
  let total = 0

  if (itemPath !== undefined && itemPath.length > 0) {
    const craftTypeId = Number(itemPath[0])
    const craftType = tr[craftTypeId]
    if (craftType === undefined) return undefined

    if (itemPath.length > 1) {
      const lineId = Number(itemPath[1])
      const line = craftType.lines[lineId]
      if (line === undefined) return undefined
      for (const [, trait] of Object.entries(line.traits)) {
        total++
        if (trait.known) current++
      }
      return { current, total }
    }

    for (const [, line] of Object.entries(craftType.lines)) {
      for (const [, trait] of Object.entries(line.traits)) {
        total++
        if (trait.known) current++
      }
    }
    return { current, total }
  }

  for (const [, craftType] of Object.entries(tr)) {
    for (const [, line] of Object.entries(craftType.lines)) {
      for (const [, trait] of Object.entries(line.traits)) {
        total++
        if (trait.known) current++
      }
    }
  }
  return { current, total }
}

export function resolveCadwell(
  charData: SavedCharacterEntry | undefined,
  itemPath: (string | number)[] | undefined
): TaskProgress | undefined {
  const cadwell = charData?.cadwell
  if (cadwell === undefined) return undefined

  let current = 0
  let total = 0

  if (itemPath !== undefined && itemPath.length > 0) {
    const levelId = Number(itemPath[0])
    const level = cadwell.levels[levelId]
    if (level === undefined) return undefined

    if (itemPath.length > 1) {
      const zoneId = Number(itemPath[1])
      const zone = level.zones[zoneId]
      if (zone === undefined) return undefined
      for (const [, poi] of Object.entries(zone.pois)) {
        total++
        if (poi.completed) current++
      }
      return { current, total }
    }

    for (const [, zone] of Object.entries(level.zones)) {
      for (const [, poi] of Object.entries(zone.pois)) {
        total++
        if (poi.completed) current++
      }
    }
    return { current, total }
  }

  for (const [, level] of Object.entries(cadwell.levels)) {
    for (const [, zone] of Object.entries(level.zones)) {
      for (const [, poi] of Object.entries(zone.pois)) {
        total++
        if (poi.completed) current++
      }
    }
  }
  return { current, total }
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
    const group = companionQuestData.find((g) => g.companionId === companionId)
    if (group === undefined) return undefined
    let current = 0
    for (const q of group.quests) {
      if (completedIds.has(q.questId)) current++
    }
    return { current, total: group.quests.length }
  }

  let current = 0
  let total = 0
  for (const group of companionQuestData) {
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

  const knownSet = new Set<string>()
  for (const [catIdx, category] of Object.entries(ll)) {
    for (const [colIdx, bookIndices] of Object.entries(category)) {
      for (const b of bookIndices) knownSet.add(`${catIdx}:${colIdx}:${b}`)
    }
  }

  const categoryFilter =
    itemPath !== undefined && itemPath[0] !== undefined ? Number(itemPath[0]) : undefined
  const collectionFilter =
    itemPath !== undefined && itemPath[1] !== undefined ? Number(itemPath[1]) : undefined

  let current = 0
  let total = 0
  for (const cat of loreLibraryData) {
    if (categoryFilter !== undefined && cat.categoryIndex !== categoryFilter) continue
    for (const col of cat.collections) {
      if (collectionFilter !== undefined && col.collectionIndex !== collectionFilter) continue
      for (const book of col.books) {
        total++
        if (knownSet.has(`${cat.categoryIndex}:${col.collectionIndex}:${book.bookIndex}`)) {
          current++
        }
      }
    }
  }
  if (total === 0) return undefined
  return { current, total }
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
