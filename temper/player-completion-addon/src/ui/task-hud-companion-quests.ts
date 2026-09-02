import { pickFirstActionableCompanionQuest } from "@akasha/temper-player-completion/completion-companion-quest-actionability"
import type { TaskData } from "../saved-variables"

export interface CompanionQuestEnrichment {
  companionName: string
  questName: string
}

export function isCompanionQuestTask(task: TaskData): boolean {
  return task.completionCardId === "companion-quests"
}

export function pickFirstIncompleteCompanionQuest(
  completedQuestIds: ReadonlySet<number> | undefined,
  rapport: Record<number, number> | undefined
): CompanionQuestEnrichment | undefined {
  const pick = pickFirstActionableCompanionQuest(completedQuestIds ?? new Set(), rapport ?? {})
  if (pick === undefined) return undefined
  return { companionName: pick.companionName, questName: pick.questName }
}
