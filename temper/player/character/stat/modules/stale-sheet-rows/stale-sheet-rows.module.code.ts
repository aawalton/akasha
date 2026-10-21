type Stale = {
  readonly character: string
  readonly from: number
  readonly to: number
  readonly stats: ReadonlySet<string>
  readonly whileBuff?: string
}

const SPRINT_SPEED = "movement-sprint-speed"

const MERCILESS_CHARGE = "Merciless Charge"

const ONSET_DAMAGE = new Set([
  "bash-damage",
  "damage-done-bleed",
  "damage-done-disease",
  "damage-done-flame",
  "damage-done-frost",
  "damage-done-magic",
  "damage-done-oblivion",
  "damage-done-physical",
  "damage-done-poison",
  "damage-done-shock",
])

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
  {
    character: "khelta-the-eternal",
    from: 1792505792,
    to: 1792505802,
    stats: ONSET_DAMAGE,
    whileBuff: MERCILESS_CHARGE,
  },
  {
    character: "erin-solstice",
    from: 1792521672,
    to: 1792524324,
    stats: ONSET_DAMAGE,
    whileBuff: MERCILESS_CHARGE,
  },
  {
    character: "nirayicel",
    from: 1792578014,
    to: 1792578074,
    stats: ONSET_DAMAGE,
    whileBuff: MERCILESS_CHARGE,
  },
]

export function isStale(
  character: string,
  capturedAt: number,
  stat: string,
  buffs: readonly string[] = []
): boolean {
  return STALE.some(
    (one) =>
      one.character === character &&
      one.from <= capturedAt &&
      capturedAt <= one.to &&
      one.stats.has(stat) &&
      (one.whileBuff === undefined || buffs.includes(one.whileBuff))
  )
}
