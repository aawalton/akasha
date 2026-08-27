import { TEMPER_DUNGEONS, TEMPER_QUEST_GIVERS } from "@temper/shared-foundation-misc-dungeons/generated/temper-dungeons.generated"
import { getTodaysPledges as dungeonsGetTodaysPledges, type TodaysPledge } from "@temper/shared-foundation-misc-dungeons/pledge-rotation"
import { getSoloDifficulty } from "@temper/shared-foundation-misc-dungeons/solo-difficulty"
import { getSavedVariables } from "./saved-variables"

export type UndauntedPledge = TodaysPledge

export function getTodaysPledges(): readonly UndauntedPledge[] {
  return dungeonsGetTodaysPledges(TEMPER_DUNGEONS, TEMPER_QUEST_GIVERS, GetTimeStamp())
}

export function filterPledgesForCharacter(
  pledges: readonly UndauntedPledge[]
): readonly UndauntedPledge[] {
  const sv = getSavedVariables()
  const charId = GetCurrentCharacterId()
  const charData = sv.characters[charId]

  const filtered: UndauntedPledge[] = []
  for (const pledge of pledges) {
    const difficulty = getSoloDifficulty(TEMPER_DUNGEONS, pledge.dungeonKey)
    if (difficulty === "hard" || difficulty === "impossible") continue

    if (charData !== undefined) {
      const sp = charData.skillPoints
      if (sp !== undefined) {
        const earned = sp.groupDungeons[pledge.dungeonKey]
        if (earned !== undefined && earned > 0) continue
      }
    }

    filtered.push(pledge)
  }

  return filtered
}
