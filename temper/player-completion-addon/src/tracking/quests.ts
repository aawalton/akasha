import { getSavedVariables } from "../saved-variables"
import { mergeIdList } from "./collector-merge"

export function scanCompletedQuests(): number[] {
  const completedIds: number[] = []
  let questId = GetNextCompletedQuestId(undefined)

  while (questId !== undefined) {
    completedIds.push(questId)
    questId = GetNextCompletedQuestId(questId)
  }

  return completedIds
}

export function collectQuests(): undefined {
  const savedVars = getSavedVariables()
  const charEntry = savedVars.characters[GetCurrentCharacterId()]
  if (charEntry === undefined) return

  charEntry.quests = mergeIdList(charEntry.quests, scanCompletedQuests())
}

export function updateQuest(questId: number): undefined {
  const savedVars = getSavedVariables()
  const charEntry = savedVars.characters[GetCurrentCharacterId()]
  if (charEntry === undefined) return

  if (charEntry.quests === undefined) {
    charEntry.quests = []
  }

  for (const id of charEntry.quests) {
    if (id === questId) return
  }
  charEntry.quests = [...charEntry.quests, questId]
}
