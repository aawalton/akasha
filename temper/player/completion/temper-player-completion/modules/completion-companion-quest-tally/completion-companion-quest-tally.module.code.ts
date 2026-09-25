import type { CharacterCompletion } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import { COMPANION_QUEST_DATA } from "akasha/temper/player/completion/temper-player-completion/modules/companion-quest-data/companion-quest-data.module.code.ts"
import type { ItemProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-checker-types/completion-card-checker-types.module.code.ts"

export function countCompanionQuests(
  quests: CharacterCompletion["quests"],
  itemPath: readonly (string | number)[] = []
): ItemProgress | undefined {
  if (quests === undefined) return undefined
  const named = itemPath[0]
  const groups =
    named === undefined
      ? COMPANION_QUEST_DATA
      : COMPANION_QUEST_DATA.filter((group) => group.companionId === String(named))
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
