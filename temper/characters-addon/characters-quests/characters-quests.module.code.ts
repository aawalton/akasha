import { mergeIdList } from "../characters-collector-merge/characters-collector-merge.module.code.ts"
import { currentCharacterEntry } from "../characters-current-entry/characters-current-entry.module.code.ts"

export function scanCompletedQuests(this: void): number[] {
  const completedIds: number[] = []
  let questId = GetNextCompletedQuestId(undefined)

  while (questId !== undefined) {
    completedIds.push(questId)
    questId = GetNextCompletedQuestId(questId)
  }

  return completedIds
}

function storedQuestIds(): readonly number[] | undefined {
  const charEntry = currentCharacterEntry()
  const stored = charEntry?.quests
  if (stored === undefined) return undefined
  return Array.isArray(stored) ? stored : Object.values(stored)
}

export function collectQuests(this: void): undefined {
  const charEntry = currentCharacterEntry()
  if (charEntry === undefined) return

  charEntry.quests = mergeIdList(storedQuestIds(), scanCompletedQuests())
}

export function updateQuest(this: void, questId: number): undefined {
  const charEntry = currentCharacterEntry()
  if (charEntry === undefined) return

  charEntry.quests = mergeIdList(storedQuestIds(), [questId])
}
