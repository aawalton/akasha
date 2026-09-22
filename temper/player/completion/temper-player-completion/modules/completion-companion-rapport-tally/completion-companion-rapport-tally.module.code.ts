import { companions } from "akasha/temper/catalog/companion/companions-core/modules/companions/companions.module.code.ts"
import {
  clampRapportProgress,
  MAX_COMPANION_RAPPORT,
} from "akasha/temper/player/completion/temper-player-completion/modules/companion-rapport/companion-rapport.module.code.ts"
import type { ItemProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-checker-types/completion-card-checker-types.module.code.ts"

export const RAPPORT_COMPANION_IDS: readonly number[] = companions.list
  .filter((companion) => companion.esoCompanionId !== 0)
  .map((companion) => companion.esoCompanionId)

const HELD = new Set<number>(RAPPORT_COMPANION_IDS)

export const TOTAL_COMPANION_RAPPORT = RAPPORT_COMPANION_IDS.length * MAX_COMPANION_RAPPORT

export function countCompanionRapport(
  rapport: Readonly<Record<number, number>> | undefined,
  itemPath: readonly (string | number)[] = []
): ItemProgress | undefined {
  const named = itemPath[0]
  if (named !== undefined) {
    const id = Number(named)
    if (!HELD.has(id)) return undefined
    return { current: clampRapportProgress(rapport?.[id] ?? 0), total: MAX_COMPANION_RAPPORT }
  }

  let current = 0
  for (const [key, level] of Object.entries(rapport ?? {})) {
    if (HELD.has(Number(key))) current += clampRapportProgress(level)
  }
  return { current, total: TOTAL_COMPANION_RAPPORT }
}
