type Stale = {
  readonly character: string
  readonly from: number
  readonly to: number
  readonly stats: ReadonlySet<string>
}

const SPRINT_SPEED = "movement-sprint-speed"

const STALE: readonly Stale[] = [
  {
    character: "archmage-amerys",
    from: 1792502456,
    to: 1792503417,
    stats: new Set([SPRINT_SPEED]),
  },
  {
    character: "khelta-the-eternal",
    from: 1792508519,
    to: 1792508652,
    stats: new Set([SPRINT_SPEED]),
  },
  {
    character: "erin-solstice",
    from: 1792514163,
    to: 1792514206,
    stats: new Set([SPRINT_SPEED, "stamina-sprint-cost"]),
  },
]

export function isStale(character: string, capturedAt: number, stat: string): boolean {
  return STALE.some(
    (one) =>
      one.character === character &&
      one.from <= capturedAt &&
      capturedAt <= one.to &&
      one.stats.has(stat)
  )
}
