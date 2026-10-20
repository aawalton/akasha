import type { ItemLevel } from "akasha/temper/player/character/characters-equipment/modules/item-composites/item-composites.module.code.ts"

export interface LevelScaling {
  readonly slope: number
  readonly intercept: number
}

type Row = Readonly<Record<string, unknown>>

interface LevelBand {
  readonly prefix: string
  readonly bottom: number
  readonly top: number
  readonly start: number
  readonly span: number
}

let bands: readonly LevelBand[] = []

export function holdLevelBands(pages: Iterable<Row>): undefined {
  const held: LevelBand[] = []
  for (const row of pages) {
    const bottom = row.levelBandBottom
    const top = row.levelBandTop
    const start = row.worthLevelStart
    const span = row.worthLevelSpan
    if (typeof bottom !== "number" || typeof top !== "number") continue
    if (typeof start !== "number" || typeof span !== "number") continue
    const prefix = typeof row.levelBandPrefix === "string" ? row.levelBandPrefix : ""
    held.push({ prefix, bottom, top, start, span })
  }
  bands = held
  return undefined
}

function highestWorthLevel(): number {
  let most = 0
  for (const band of bands) most = Math.max(most, band.start + band.span)
  return most
}

function bandOf(level: ItemLevel): LevelBand | undefined {
  if (typeof level === "number") return bands.find((band) => band.prefix === "")
  return bands.find((band) => band.prefix !== "" && level.startsWith(band.prefix))
}

function effectiveLevel(level: ItemLevel | undefined): number {
  if (level === undefined) return highestWorthLevel()
  const band = bandOf(level)
  if (band === undefined) return highestWorthLevel()
  const value = typeof level === "number" ? level : parseInt(level.slice(band.prefix.length), 10)
  if (Number.isNaN(value)) return highestWorthLevel()
  const within = Math.max(band.bottom, Math.min(band.top, value))
  return band.start + Math.floor((within * band.span) / band.top)
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
