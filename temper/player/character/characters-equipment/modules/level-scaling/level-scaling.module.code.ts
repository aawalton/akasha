import type { ItemLevel } from "akasha/temper/player/character/characters-equipment/modules/item-composites/item-composites.module.code.ts"

export interface LevelScaling {
  readonly slope: number
  readonly intercept: number
}

function effectiveLevel(level: ItemLevel | undefined): number {
  if (level === undefined) {
    return 73
  }

  if (typeof level === "number") {
    return Math.max(1, Math.min(50, level))
  }

  const cpValue = parseInt(level.slice(2), 10)
  return 50 + Math.floor((cpValue * 23) / 160)
}

export function levelScalingOf(slope: unknown, intercept: unknown): LevelScaling | undefined {
  if (typeof slope !== "number" || typeof intercept !== "number") return undefined
  return { slope, intercept }
}

export function levelScaledWorth(
  level: ItemLevel | undefined,
  scaling: LevelScaling,
  qualityScale: number
): number {
  return (scaling.slope * effectiveLevel(level) + scaling.intercept) * qualityScale
}
