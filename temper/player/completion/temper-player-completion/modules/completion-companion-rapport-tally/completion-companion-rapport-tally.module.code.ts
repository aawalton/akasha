import {
  companions,
  getCompanionIdByDefId,
} from "akasha/temper/catalog/companion/companions-core/modules/companions/companions.module.code.ts"
import type { CharacterCompletion } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import {
  heldCompanionRapport,
  MAX_COMPANION_RAPPORT,
} from "akasha/temper/player/completion/temper-player-completion/modules/companion-rapport/companion-rapport.module.code.ts"
import type { ItemProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-checker-types/completion-card-checker-types.module.code.ts"
import { hasCompanionQuestLeft } from "akasha/temper/player/completion/temper-player-completion/modules/completion-companion-quest-actionability/completion-companion-quest-actionability.module.code.ts"

type RapportHolder = Pick<CharacterCompletion, "companionRapport" | "quests">

export function rapportCompanionIds(): readonly number[] {
  return companions()
    .list.filter((companion) => companion.esoCompanionId !== 0)
    .map((companion) => companion.esoCompanionId)
}

export function totalCompanionRapport(): number {
  return rapportCompanionIds().length * MAX_COMPANION_RAPPORT
}

export function countCompanionRapport(
  completion: RapportHolder | null | undefined,
  itemPath: readonly (string | number)[] = []
): ItemProgress | undefined {
  const rapport = completion?.companionRapport
  const done = new Set<number>(completion?.quests ?? [])
  const heldBy = (id: number): number => {
    const companionId = getCompanionIdByDefId(id)
    const questLeft = companionId !== undefined && hasCompanionQuestLeft(companionId, done)
    return heldCompanionRapport(rapport?.[id] ?? 0, questLeft)
  }

  const ids = rapportCompanionIds()
  const named = itemPath[0]
  if (named !== undefined) {
    const id = Number(named)
    if (!ids.includes(id)) return undefined
    return { current: heldBy(id), total: MAX_COMPANION_RAPPORT }
  }

  let current = 0
  for (const id of ids) current += heldBy(id)
  return { current, total: totalCompanionRapport() }
}
