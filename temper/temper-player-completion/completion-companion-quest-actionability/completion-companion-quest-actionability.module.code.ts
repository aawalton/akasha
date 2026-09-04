import { getDefIdByCompanionId } from "@akasha/temper-companions-core/companions"
import { COMPANION_QUEST_DATA } from "../companion-quest-data/companion-quest-data.module.code.ts"
import { rawRapportToCompanionTier } from "../companion-rapport/companion-rapport.module.code.ts"

export interface ActionableCompanionQuest {
  companionId: string
  companionName: string
  questId: number
  questName: string
}

export function isCompanionQuestActionable(
  quest: { questId: number; requiredRapportLevel?: number },
  completedIds: ReadonlySet<number>,
  currentRapportLevel: number
): boolean {
  if (completedIds.has(quest.questId)) return false
  if (
    quest.requiredRapportLevel !== undefined &&
    currentRapportLevel < quest.requiredRapportLevel
  ) {
    return false
  }
  return true
}

export const sortedCompanionQuestGroups: readonly (typeof COMPANION_QUEST_DATA)[number][] = [
  ...COMPANION_QUEST_DATA,
].sort((a, b) => {
  if (a.companionName < b.companionName) return -1
  if (a.companionName > b.companionName) return 1
  return 0
})

export function pickFirstActionableCompanionQuest(
  completedIds: ReadonlySet<number>,
  rapportByDefId: Record<number, number>,
  companionId?: string
): ActionableCompanionQuest | undefined {
  for (const group of sortedCompanionQuestGroups) {
    if (companionId !== undefined && group.companionId !== companionId) continue
    const defId = getDefIdByCompanionId(group.companionId)
    const raw = defId !== undefined ? rapportByDefId[defId] : undefined
    const currentLevel = raw === undefined ? 0 : rawRapportToCompanionTier(raw)
    for (const quest of group.quests) {
      if (isCompanionQuestActionable(quest, completedIds, currentLevel)) {
        return {
          companionId: group.companionId,
          companionName: group.companionName,
          questId: quest.questId,
          questName: quest.name,
        }
      }
    }
  }
  return undefined
}

export function isCompanionQuestPathComplete(
  completedIds: ReadonlySet<number>,
  rapportByDefId: Record<number, number>,
  itemPath?: readonly (string | number)[] | null
): boolean {
  if (itemPath === undefined || itemPath === null || itemPath.length === 0) {
    return pickFirstActionableCompanionQuest(completedIds, rapportByDefId) === undefined
  }
  const slug = String(itemPath[0])
  const group = COMPANION_QUEST_DATA.find((g) => g.companionId === slug)
  if (group === undefined) return false
  if (itemPath.length === 1) {
    return pickFirstActionableCompanionQuest(completedIds, rapportByDefId, slug) === undefined
  }
  const questId = Number(itemPath[1])
  const quest = group.quests.find((q) => q.questId === questId)
  if (quest === undefined) return false
  const defId = getDefIdByCompanionId(group.companionId)
  const currentLevel = defId !== undefined ? (rapportByDefId[defId] ?? 0) : 0
  return !isCompanionQuestActionable(quest, completedIds, currentLevel)
}
