import { companionQuestData, companionQuestIds } from "./companion-quest-data"
import type { CompletionCharacterRow } from "./completion-character-row-type"
import { isCharacterMeasured } from "./completion-measured"
import type { CharacterQuestProgress, QuestZoneProgress } from "./completion-ui-types"
import { questData } from "./generated/quest-data.generated"

const regularQuestData = questData
  .map((zone) => ({
    ...zone,
    quests: zone.quests.filter((q) => !companionQuestIds.has(q.questId)),
  }))
  .filter((zone) => zone.quests.length > 0)

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

export function transformQuestProgress(
  rows: readonly CompletionCharacterRow[]
): readonly CharacterQuestProgress[] {
  if (regularQuestData.length === 0) return []

  const totalCount = regularQuestData.reduce((sum, zone) => sum + zone.quests.length, 0)

  const result: CharacterQuestProgress[] = []

  for (const row of rows) {
    const completion = row.completion
    if (!completion || !isCharacterMeasured(completion)) continue

    const completedIds = extractCompletedIds(completion)
    let completedCount = 0

    const zones: QuestZoneProgress[] = regularQuestData.map((zone) => {
      const questEntries = zone.quests.map((q) => {
        const completed = completedIds.has(q.questId)
        if (completed) completedCount++
        return { questId: q.questId, name: q.name, completed }
      })
      return { zoneName: zone.zoneName, quests: questEntries }
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
  if (companionQuestData.length === 0) return []

  const totalCount = companionQuestData.reduce((sum, group) => sum + group.quests.length, 0)

  const result: CharacterQuestProgress[] = []

  for (const row of rows) {
    const completion = row.completion
    if (!completion || !isCharacterMeasured(completion)) continue

    const completedIds = extractCompletedIds(completion)
    let completedCount = 0

    const zones: QuestZoneProgress[] = companionQuestData.map((group) => {
      const questEntries = group.quests.map((q) => {
        const completed = completedIds.has(q.questId)
        if (completed) completedCount++
        return { questId: q.questId, name: q.name, completed }
      })
      return { zoneName: group.companionName, quests: questEntries }
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
