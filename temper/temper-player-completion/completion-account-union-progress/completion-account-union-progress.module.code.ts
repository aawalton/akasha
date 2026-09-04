import { requireFirst } from "@akasha/utils-narrow/require-first"
import type {
  CharacterQuestProgress,
  QuestZoneProgress,
} from "../completion-ui-types/completion-ui-types.module.code.ts"

export interface AccountQuestUnionProgress {
  zones: readonly QuestZoneProgress[]
  completedCount: number
  totalCount: number
}

export function transformAccountQuestUnion(
  questProgress: readonly CharacterQuestProgress[]
): AccountQuestUnionProgress {
  if (questProgress.length === 0) {
    return { zones: [], completedCount: 0, totalCount: 0 }
  }

  const completedIds = new Set<number>()
  for (const cp of questProgress) {
    for (const zone of cp.zones) {
      for (const q of zone.quests) {
        if (q.completed) completedIds.add(q.questId)
      }
    }
  }

  const template = requireFirst(questProgress)
  let completedCount = 0
  let totalCount = 0

  const zones: QuestZoneProgress[] = template.zones.map((zone) => ({
    zoneName: zone.zoneName,
    quests: zone.quests.map((q) => {
      const completed = completedIds.has(q.questId)
      totalCount++
      if (completed) completedCount++
      return { questId: q.questId, name: q.name, completed }
    }),
  }))

  return { zones, completedCount, totalCount }
}

export function transformCompanionQuestUnion(
  companionQuestProgress: readonly CharacterQuestProgress[]
): AccountQuestUnionProgress {
  if (companionQuestProgress.length === 0) {
    return { zones: [], completedCount: 0, totalCount: 0 }
  }

  const completedIds = new Set<number>()
  for (const cp of companionQuestProgress) {
    for (const zone of cp.zones) {
      for (const q of zone.quests) {
        if (q.completed) completedIds.add(q.questId)
      }
    }
  }

  const template = requireFirst(companionQuestProgress)
  let completedCount = 0
  let totalCount = 0

  const zones: QuestZoneProgress[] = template.zones.map((zone) => ({
    zoneName: zone.zoneName,
    quests: zone.quests.map((q) => {
      const completed = completedIds.has(q.questId)
      totalCount++
      if (completed) completedCount++
      return { questId: q.questId, name: q.name, completed }
    }),
  }))

  return { zones, completedCount, totalCount }
}
