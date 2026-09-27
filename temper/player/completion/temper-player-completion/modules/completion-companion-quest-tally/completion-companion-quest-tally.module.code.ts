import type { CharacterCompletion } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import { companionQuestGroups } from "akasha/temper/player/completion/temper-player-completion/modules/companion-quest-data/companion-quest-data.module.code.ts"
import type { ItemProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-checker-types/completion-card-checker-types.module.code.ts"

export function countCompanionQuests(
  quests: CharacterCompletion["quests"],
  itemPath: readonly (string | number)[] = []
): ItemProgress | undefined {
  if (quests === undefined) return undefined
  const named = itemPath[0]
  const every = companionQuestGroups()
  const groups =
    named === undefined ? every : every.filter((group) => group.companionId === String(named))
  if (groups.length === 0) return undefined

  const done = new Set(quests)
  let current = 0
  let total = 0
  for (const group of groups) {
    for (const quest of group.quests) {
      total += 1
      if (done.has(quest.questId)) current += 1
    }
  }
  return { current, total }
}
