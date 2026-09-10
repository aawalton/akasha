import {
  COMPANION_QUEST_DATA,
  companionQuestIds,
} from "../companion-quest-data/companion-quest-data.module.code.ts"
import type { CompletionCharacterRow } from "../completion-character-row/completion-character-row.module.code.ts"
import { isCharacterMeasured } from "../completion-measured/completion-measured.module.code.ts"
import type {
  CharacterQuestProgress,
  QuestZoneProgress,
} from "../completion-ui-types/completion-ui-types.module.code.ts"

export interface QuestCatalogQuest {
  esoQuestId: number
  questName: string
}

export interface QuestCatalogZone {
  title: string
  zoneQuests: readonly QuestCatalogQuest[]
}

export function extractCompletedIds(
  completion: NonNullable<CompletionCharacterRow["completion"]>
): Set<number> {
  const ids = new Set<number>()
  const rawQuests = completion.quests
  if (!rawQuests) return ids

  if (Array.isArray(rawQuests)) {
    for (const id of rawQuests) {
      if (typeof id === "number") ids.add(id)
    }
  } else if (typeof rawQuests === "object") {
    for (const id of Object.values(rawQuests)) {
      if (typeof id === "number") ids.add(id)
    }
  }
  return ids
}

function zonesWithoutCompanionQuests(
  questCatalog: readonly QuestCatalogZone[]
): readonly QuestCatalogZone[] {
  const zones: QuestCatalogZone[] = []
  for (const zone of questCatalog) {
    const zoneQuests = zone.zoneQuests.filter((quest) => !companionQuestIds.has(quest.esoQuestId))
    if (zoneQuests.length > 0) zones.push({ title: zone.title, zoneQuests })
  }
  return zones
}

export function transformQuestProgress(
  rows: readonly CompletionCharacterRow[],
  questCatalog: readonly QuestCatalogZone[]
): readonly CharacterQuestProgress[] {
  const regularZones = zonesWithoutCompanionQuests(questCatalog)
  if (regularZones.length === 0) return []

  const totalCount = regularZones.reduce((sum, zone) => sum + zone.zoneQuests.length, 0)

  const result: CharacterQuestProgress[] = []

  for (const row of rows) {
    const completion = row.completion
    if (!completion || !isCharacterMeasured(completion)) continue

    const completedIds = extractCompletedIds(completion)
    let completedCount = 0

    const zones: QuestZoneProgress[] = regularZones.map((zone) => {
      const quests = zone.zoneQuests.map((quest) => {
        const completed = completedIds.has(quest.esoQuestId)
        if (completed) completedCount++
        return { questId: quest.esoQuestId, name: quest.questName, completed }
      })
      return { zoneName: zone.title, quests }
    })

    result.push({
      characterId: row.id,
      zones,
      completedCount,
      totalCount,
    })
  }

  return result
}

export function transformCompanionQuestProgress(
  rows: readonly CompletionCharacterRow[]
): readonly CharacterQuestProgress[] {
  if (COMPANION_QUEST_DATA.length === 0) return []

  const totalCount = COMPANION_QUEST_DATA.reduce((sum, group) => sum + group.quests.length, 0)

  const result: CharacterQuestProgress[] = []

  for (const row of rows) {
    const completion = row.completion
    if (!completion || !isCharacterMeasured(completion)) continue

    const completedIds = extractCompletedIds(completion)
    let completedCount = 0

    const zones: QuestZoneProgress[] = COMPANION_QUEST_DATA.map((group) => {
      const quests = group.quests.map((quest) => {
        const completed = completedIds.has(quest.questId)
        if (completed) completedCount++
        return { questId: quest.questId, name: quest.name, completed }
      })
      return { zoneName: group.companionName, quests }
    })

    result.push({
      characterId: row.id,
      zones,
      completedCount,
      totalCount,
    })
  }

  return result
}
