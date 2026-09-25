import { getDefIdByCompanionId } from "akasha/temper/catalog/companion/companions-core/modules/companions/companions.module.code.ts"
import { COMPANION_QUEST_DATA } from "akasha/temper/player/completion/temper-player-completion/modules/companion-quest-data/companion-quest-data.module.code.ts"
import { rawRapportToCompanionTier } from "akasha/temper/player/completion/temper-player-completion/modules/companion-rapport/companion-rapport.module.code.ts"

interface ActionableCompanionQuest {
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
