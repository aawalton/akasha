import type {
  CadwellLevel,
  CadwellProgress,
  CadwellZone,
} from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import type { ItemProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-checker-types/completion-card-checker-types.module.code.ts"

function countZone(zone: CadwellZone): ItemProgress {
  let current = 0
  let total = 0
  for (const poi of Object.values(zone.pois ?? {})) {
    total += 1
    if (poi.completed) current += 1
  }
  return { current, total }
}

function countLevel(level: CadwellLevel): ItemProgress {
  let current = 0
  let total = 0
  for (const zone of Object.values(level.zones ?? {})) {
    const counted = countZone(zone)
    current += counted.current
    total += counted.total
  }
  return { current, total }
}

export function countCadwell(
  cadwell: CadwellProgress | undefined,
  itemPath: readonly (string | number)[] = []
): ItemProgress | undefined {
  const levels = cadwell?.levels
  if (levels === undefined) return undefined

  if (itemPath.length === 0) {
    let current = 0
    let total = 0
    for (const level of Object.values(levels)) {
      const counted = countLevel(level)
      current += counted.current
      total += counted.total
    }
    return { current, total }
  }

  const level = levels[Number(itemPath[0])]
  if (level === undefined) return undefined
  if (itemPath.length === 1) return countLevel(level)

  const zone = level.zones?.[Number(itemPath[1])]
  return zone === undefined ? undefined : countZone(zone)
}
