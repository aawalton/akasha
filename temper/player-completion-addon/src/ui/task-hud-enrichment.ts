import {
  findFirstIncompleteCadwellZone,
  sortCadwellPois,
} from "@akasha/temper-player-completion/completion-cadwell-sort"
import { findFirstIncompleteLoreCollection } from "@akasha/temper-player-completion/completion-lore-collection"
import { shalidorLibraryCollections } from "@temper/player-completion/generated/lore-shalidor-data.generated"
import {
  type ActiveAntiquityLead,
  collectActiveAntiquityLeads,
  isActionableLead,
  isLegendaryLead,
  isMotifLead,
} from "../antiquity-lead-checks"
import { CHAPTERS_PER_STYLE, MOTIF_STYLE_LOOKUP } from "../generated/motif-style-lookup.generated"
import { getSavedVariables, type TaskData } from "../saved-variables"

declare global {
  var TemperLeads:
    | {
        getAntiquityDigZoneName?: (this: void, antiquityId: number) => string | undefined
      }
    | undefined
}

import {
  type CompanionQuestEnrichment,
  pickFirstIncompleteCompanionQuest,
} from "./task-hud-companion-quests"
import {
  type CompanionRapportEnrichment,
  pickFirstIncompleteCompanionRapport,
} from "./task-hud-companion-rapport"
import { UNDAUNTED_SKILL_LINE_ID } from "./task-hud-state"
import type { TaskProgress } from "./task-progress-resolver-types"


export function getCompanionRapportEnrichment(): CompanionRapportEnrichment | undefined {
  const sv = getSavedVariables()
  const charId = GetCurrentCharacterId()
  const rapport = sv.characters[charId]?.companionRapport
  return pickFirstIncompleteCompanionRapport(rapport)
}

export function getCompanionQuestEnrichment(): CompanionQuestEnrichment | undefined {
  const sv = getSavedVariables()
  const charId = GetCurrentCharacterId()
  const charData = sv.characters[charId]
  const quests = charData?.quests
  const completedIds = quests !== undefined ? new Set<number>(quests) : undefined
  const rapport = charData?.companionRapport
  return pickFirstIncompleteCompanionQuest(completedIds, rapport)
}

export function isUndauntedTask(task: TaskData): boolean {
  if (task.completionCardId !== "skill-lines") return false
  if (task.completionItemPath === undefined) return false
  if (task.completionItemPath.length === 0) return false
  return task.completionItemPath[0] === UNDAUNTED_SKILL_LINE_ID
}

export function isCadwellTask(task: TaskData): boolean {
  return task.completionCardId === "cadwells-almanac"
}

export interface CadwellEnrichment {
  zoneName: string
  incompletePois: readonly string[]
  completedPois: number
  totalPois: number
}

export function getCadwellEnrichment(task: TaskData): CadwellEnrichment | undefined {
  const sv = getSavedVariables()
  const charId = GetCurrentCharacterId()
  const charData = sv.characters[charId]
  const cadwell = charData?.cadwell
  if (cadwell === undefined) return undefined

  const path = task.completionItemPath

  if (path !== undefined && path.length > 1) {
    const levelId = Number(path[0])
    const zoneId = Number(path[1])
    const zone = cadwell.levels[levelId]?.zones[zoneId]
    if (zone === undefined) return undefined
    const sortedPois = sortCadwellPois(zone.pois)
    const incompletePois = sortedPois.filter((p) => !p.completed).map((p) => p.name)
    if (incompletePois.length === 0) return undefined
    const totalPois = sortedPois.length
    return {
      zoneName: zone.name,
      incompletePois,
      completedPois: totalPois - incompletePois.length,
      totalPois,
    }
  }

  const levelScope = path !== undefined && path.length > 0 ? Number(path[0]) : undefined
  const result = findFirstIncompleteCadwellZone(cadwell, levelScope)
  if (result === undefined) return undefined
  return {
    zoneName: result.zoneName,
    incompletePois: [...result.incompletePoiNames],
    completedPois: result.totalPois - result.incompletePoiNames.length,
    totalPois: result.totalPois,
  }
}

export const SHALIDORS_LIBRARY_CATEGORY = 1

export function isLoreLibraryTask(task: TaskData): boolean {
  if (task.completionCardId !== "lore-library-character") return false
  if (task.completionItemPath === undefined || task.completionItemPath.length === 0) return false
  return task.completionItemPath[0] === SHALIDORS_LIBRARY_CATEGORY
}

export interface LoreLibraryEnrichment {
  collectionName: string
  unreadBooks: readonly string[]
  knownBooks: number
  totalBooks: number
}

export function getLoreLibraryEnrichment(): LoreLibraryEnrichment | undefined {
  const sv = getSavedVariables()
  const charId = GetCurrentCharacterId()
  const ll = sv.characters[charId]?.loreLibrary
  if (ll === undefined) return undefined

  const knownSet = new Set<string>()
  for (const [catIdx, category] of Object.entries(ll)) {
    for (const [colIdx, bookIndices] of Object.entries(category)) {
      for (const b of bookIndices) knownSet.add(`${catIdx}:${colIdx}:${b}`)
    }
  }

  const result = findFirstIncompleteLoreCollection(
    shalidorLibraryCollections,
    knownSet,
    SHALIDORS_LIBRARY_CATEGORY
  )
  if (result === undefined) return undefined
  return {
    collectionName: result.collectionName,
    unreadBooks: [...result.unreadBookNames],
    knownBooks: result.knownBooks,
    totalBooks: result.totalBooks,
  }
}

export const CRAFTING_MOTIFS_CATEGORY = 2
export const MAX_MOTIF_BADGES = 8

export function isMotifTask(task: TaskData): boolean {
  if (task.completionCardId !== "lore-library-character") return false
  if (task.completionItemPath === undefined || task.completionItemPath.length === 0) return false
  return task.completionItemPath[0] === CRAFTING_MOTIFS_CATEGORY
}

export interface MotifSubRowEntry {
  name: string
  known: number
  total: number
  sourceDescription: string
}

export function getMotifSourceEnrichment(task: TaskData): MotifSubRowEntry[] {
  const sv = getSavedVariables()
  const charId = GetCurrentCharacterId()
  const charData = sv.characters[charId]
  const loreLibrary = charData?.loreLibrary
  if (loreLibrary === undefined) return []

  const category = loreLibrary[CRAFTING_MOTIFS_CATEGORY]
  if (category === undefined) return []

  const path = task.completionItemPath

  let targetIndices: number[]
  if (path !== undefined && path.length >= 2 && path[0] === CRAFTING_MOTIFS_CATEGORY) {
    targetIndices = [Number(path[1])]
  } else {
    targetIndices = []
    for (const key of Object.keys(MOTIF_STYLE_LOOKUP)) {
      targetIndices.push(Number(key))
    }
  }

  const entries: MotifSubRowEntry[] = []
  for (const collectionIndex of targetIndices) {
    const style = MOTIF_STYLE_LOOKUP[collectionIndex]
    if (style === undefined) continue

    const knownBooks = category[collectionIndex]
    let known = 0
    if (knownBooks !== undefined) {
      if (Array.isArray(knownBooks)) {
        known = knownBooks.length
      } else {
        known = Object.keys(knownBooks).length
      }
    }

    if (known >= CHAPTERS_PER_STYLE) continue

    entries.push({
      name: style.name,
      known,
      total: CHAPTERS_PER_STYLE,
      sourceDescription: style.sourceDescription,
    })
  }

  entries.sort((a, b) => {
    const remA = a.total - a.known
    const remB = b.total - b.known
    if (remA !== remB) return remA - remB
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0
  })

  if (targetIndices.length > 1 && entries.length > MAX_MOTIF_BADGES) {
    entries.length = MAX_MOTIF_BADGES
  }

  return entries
}

export const DRAGONGUARD_OPERATIVE_ACHIEVEMENT = 2612

export function isDragonguardTask(task: TaskData): boolean {
  if (task.completionCardId !== "character-achievements") return false
  if (task.completionItemPath === undefined || task.completionItemPath.length < 3) return false
  return task.completionItemPath[2] === DRAGONGUARD_OPERATIVE_ACHIEVEMENT
}

export interface DragonguardBadge {
  id: string
  label: string
}

export function getDragonguardBadges(): DragonguardBadge[] {
  return [
    { id: "delve-daily", label: "Delve Daily" },
    { id: "dragon-hunt-daily", label: "Dragon Hunt Daily" },
  ]
}

export function isAntiquityLoreTask(task: TaskData): boolean {
  return task.completionCardId === "antiquity-lore"
}

export function isAntiquityMotifsTask(task: TaskData): boolean {
  return task.completionCardId === "antiquity-leads-motifs"
}

export function isAntiquityLegendaryTask(task: TaskData): boolean {
  return task.completionCardId === "antiquity-leads-legendary"
}

export interface AntiquityLeadGroup {
  readonly digZone: string
  readonly completedThisSession: number
  readonly totalAtSessionStart: number
  readonly leadNames: readonly string[]
}

export interface AntiquityLeadEnrichment {
  readonly groups: readonly AntiquityLeadGroup[]
  readonly ungrouped: readonly string[]
}

const ANTIQUITY_LEAD_PREDICATE: Record<string, (lead: ActiveAntiquityLead) => boolean> = {
  "antiquity-lore": isActionableLead,
  "antiquity-leads-motifs": isMotifLead,
  "antiquity-leads-legendary": isLegendaryLead,
}

export function buildAntiquityLeadEnrichment(
  this: void,
  current: readonly ActiveAntiquityLead[],
  baseline: readonly ActiveAntiquityLead[],
  resolveDigZone: (this: void, antiquityId: number) => string | undefined
): AntiquityLeadEnrichment {
  const sorted = [...current].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))

  const zoneOrder: string[] = []
  const namesByZone: Record<string, string[]> = {}
  const ungrouped: string[] = []
  for (const lead of sorted) {
    const digZone = resolveDigZone(lead.antiquityId)
    if (digZone === undefined) {
      ungrouped.push(lead.name)
      continue
    }
    const names = namesByZone[digZone]
    if (names === undefined) {
      namesByZone[digZone] = [lead.name]
      zoneOrder.push(digZone)
    } else {
      names.push(lead.name)
    }
  }

  const currentIds = current.map((lead) => lead.antiquityId)
  const groups = zoneOrder.map((digZone): AntiquityLeadGroup => {
    const leadNames = namesByZone[digZone] ?? []
    const baselineInZone = baseline.filter((lead) => resolveDigZone(lead.antiquityId) === digZone)
    const stillActive = baselineInZone.filter((lead) => currentIds.includes(lead.antiquityId))
    return {
      digZone,
      leadNames,
      totalAtSessionStart: baselineInZone.length > 0 ? baselineInZone.length : leadNames.length,
      completedThisSession: baselineInZone.length - stillActive.length,
    }
  })

  return { groups, ungrouped }
}

let sessionBaselineLeads: readonly ActiveAntiquityLead[] | undefined

function getSessionBaselineLeads(this: void): readonly ActiveAntiquityLead[] {
  if (sessionBaselineLeads === undefined) sessionBaselineLeads = collectActiveAntiquityLeads()
  return sessionBaselineLeads
}

function resolveAntiquityDigZone(this: void, antiquityId: number): string | undefined {
  return globalThis.TemperLeads?.getAntiquityDigZoneName?.(antiquityId)
}

export function getAntiquityLeadEnrichment(cardId: string): AntiquityLeadEnrichment {
  const predicate = ANTIQUITY_LEAD_PREDICATE[cardId]
  if (predicate === undefined) return { groups: [], ungrouped: [] }
  return buildAntiquityLeadEnrichment(
    collectActiveAntiquityLeads().filter(predicate),
    getSessionBaselineLeads().filter(predicate),
    resolveAntiquityDigZone
  )
}

export function isAntiquitySessionTask(task: TaskData): boolean {
  return isAntiquityLoreTask(task) || isAntiquityMotifsTask(task) || isAntiquityLegendaryTask(task)
}

export function aggregateAntiquitySessionProgress(
  this: void,
  current: readonly ActiveAntiquityLead[],
  baseline: readonly ActiveAntiquityLead[]
): TaskProgress | undefined {
  if (baseline.length === 0) return undefined
  const currentIds = current.map((lead) => lead.antiquityId)
  const stillActive = baseline.filter((lead) => currentIds.includes(lead.antiquityId)).length
  return { current: baseline.length - stillActive, total: baseline.length }
}

export function getAntiquityLeadSessionProgress(
  cardId: string | undefined
): TaskProgress | undefined {
  if (cardId === undefined) return undefined
  const predicate = ANTIQUITY_LEAD_PREDICATE[cardId]
  if (predicate === undefined) return undefined
  return aggregateAntiquitySessionProgress(
    collectActiveAntiquityLeads().filter(predicate),
    getSessionBaselineLeads().filter(predicate)
  )
}
