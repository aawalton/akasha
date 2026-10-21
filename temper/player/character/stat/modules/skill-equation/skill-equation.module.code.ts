import { mighty } from "akasha/temper/catalog/champion-point/temper-champion-star/pages/mighty.temper-champion-star.ts"
import { warMage } from "akasha/temper/catalog/champion-point/temper-champion-star/pages/war-mage.temper-champion-star.ts"
import { emeraldMoss } from "akasha/temper/catalog/skill/pages/emerald-moss/emerald-moss.temper-skill.ts"

export type EquationStats = {
  readonly maxStat: number
  readonly maxPower: number
  readonly health: number
  readonly magicka: number
  readonly stamina: number
  readonly spellDamage: number
  readonly weaponDamage: number
  readonly healingDone: number
}

type Equation = {
  readonly placeholder: number
  readonly terms: readonly (readonly [keyof EquationStats, number])[]
  readonly constant: number
  readonly scaled: boolean
  readonly read: boolean
  readonly tags: readonly string[]
}

const VARIABLES: Readonly<Record<string, keyof EquationStats>> = {
  MaxStat: "maxStat",
  MaxPower: "maxPower",
  Health: "health",
  Magicka: "magicka",
  Stamina: "stamina",
  SD: "spellDamage",
  WD: "weaponDamage",
}

const UNITS = new Set(["second", "seconds", "minute", "minutes", "meters", "hours", "hour"])

const LINE = /^<<(\d+)>> = (.*?)(?: \((.*)\))?$/

const PART = /^(-?\d+(?:\.\d+)?(?:e-?\d+)?)%?(?:\s+([A-Za-z]+))?$/

export function equationOf(line: string): Equation | undefined {
  const matched = LINE.exec(line.trim())
  if (matched === null) return undefined
  const [, placeholder, body = "", tagged = ""] = matched
  const terms: [keyof EquationStats, number][] = []
  let constant = 0
  let read = true
  for (const part of body.replace(/ - /g, " + -").split(" + ")) {
    const term = PART.exec(part.trim())
    if (term === null) {
      read = false
      continue
    }
    const value = Number(term[1])
    const name = term[2]
    const variable = name === undefined ? undefined : VARIABLES[name]
    if (variable !== undefined) terms.push([variable, value])
    else if (name === undefined || UNITS.has(name)) constant += value
    else read = false
  }
  return {
    placeholder: Number(placeholder),
    terms,
    constant,
    scaled: terms.length > 0,
    read,
    tags: tagged === "" ? [] : tagged.split(", "),
  }
}

export type TooltipNumber = {
  readonly placeholder: number
  readonly equation: string
  readonly scaled: boolean
  readonly game: number
  readonly temper: number | null
}

export type TooltipPairing =
  | { readonly paired: true; readonly numbers: readonly TooltipNumber[] }
  | { readonly paired: false; readonly shown: readonly number[]; readonly equations: number }

const SHOWN = /\|c[0-9a-fA-F]{6}(-?\d+(?:\.\d+)?)\|r/g

const NAMES_A_NUMBER = /^<<\d+>> = -?\d/

export function equationStatsOf(
  stats: Readonly<Record<string, number>>,
  healingDone = 0
): EquationStats {
  const at = (key: string) => stats[key] ?? 0
  return {
    maxStat: Math.max(at("magicka-maximum"), at("stamina-maximum")),
    maxPower: Math.max(at("power-weapon"), at("power-spell")),
    health: at("health-maximum"),
    magicka: at("magicka-maximum"),
    stamina: at("stamina-maximum"),
    spellDamage: at("power-spell"),
    weaponDamage: at("power-weapon"),
    healingDone,
  }
}

export function shownNumbersOf(description: string): readonly number[] {
  return [...description.matchAll(SHOWN)].map((one) => Number(one[1]))
}

export type ActiveHeld = {
  readonly buffs: ReadonlySet<string>
  readonly championPoints: Readonly<Record<string, number>>
  readonly mediumPieces: number
  readonly stacks: Readonly<Record<string, number>>
}

export const NOTHING_ACTIVE: ActiveHeld = {
  buffs: new Set(),
  championPoints: {},
  mediumPieces: 0,
  stacks: {},
}

export function tooltipPairingOf(
  description: string,
  equations: readonly string[],
  stats: EquationStats,
  passives: ReadonlySet<string>,
  active: ActiveHeld = NOTHING_ACTIVE,
  durationMs?: number
): TooltipPairing {
  const shown = shownNumbersOf(description)
  const numbered = equations.filter((line) => NAMES_A_NUMBER.test(line))
  if (numbered.length !== shown.length) return { paired: false, shown, equations: numbered.length }
  const numbers = numbered.map((line, at) => {
    const equation = equationOf(line)
    return {
      placeholder: equation?.placeholder ?? at + 1,
      equation: line,
      scaled: equation?.scaled ?? false,
      game: shown[at] ?? 0,
      temper: tooltipValueOf(equation, stats, passives, active, durationMs) ?? null,
    }
  })
  return { paired: true, numbers }
}

const LONGER = /^\+(\d+(?:\.\d+)?) seconds with ([a-z0-9-]+)$/

function longerBy(equation: Equation, passives: ReadonlySet<string>): number {
  return equation.tags.reduce((sum, tag) => {
    const matched = LONGER.exec(tag)
    return matched !== null && passives.has(matched[2] ?? "") ? sum + Number(matched[1]) : sum
  }, 0)
}

const SHIELD = "DmgShield"

const HEAL = "Heal"

const DAMAGE = "Dmg"

const DIRECT = "Direct"

const OVER_TIME = "DOT"

const ON_APPLICATION = "ticks on application"

const OWN_DURATION = "own duration"

const PER_TICK = "per tick"

const DURATION = /^(\d+(?:\.\d+)?)s duration$/

const TICK = /^(\d+(?:\.\d+)?)s tick$/

const HALF_HEALTH = "at most half Health"

const BONUSES: readonly {
  readonly held: readonly string[]
  readonly tags: readonly string[]
  readonly percent: number
}[] = [
  { held: ["bastion"], tags: [SHIELD], percent: 15 },
  { held: ["master-at-arms"], tags: [DAMAGE, DIRECT], percent: 6 },
  { held: ["thaumaturge"], tags: [DAMAGE, OVER_TIME], percent: 6 },
  { held: ["biting-aura"], tags: [DAMAGE, "AOE"], percent: 6 },
  { held: ["deadly-aim"], tags: [DAMAGE, "SingleTarget"], percent: 6 },
  { held: ["ancient-knowledge", "lightning-staff"], tags: [DAMAGE, DIRECT], percent: 12 },
]

const DAMAGE_BUFFS: Readonly<Record<string, number>> = {
  "Minor Berserk": 5,
  Landslide: 1,
  "Standard of Might": 15,
}

const DAMAGE_PER_STACK: Readonly<Record<string, number>> = {
  Landslide: 1,
}

function stackedOf(equation: Equation, active: ActiveHeld): number {
  if (!isDamage(equation)) return 1
  const percent = Object.entries(active.stacks).reduce(
    (sum, [buff, stacks]) => sum + (DAMAGE_PER_STACK[buff] ?? 0) * stacks,
    0
  )
  return 1 + percent / 100
}

function bonusOf(
  equation: Equation,
  held: ReadonlySet<string>,
  active: ActiveHeld = NOTHING_ACTIVE
): number {
  const buffed = isDamage(equation)
    ? [...active.buffs].reduce((sum, one) => sum + (DAMAGE_BUFFS[one] ?? 0), 0)
    : 0
  const percent = BONUSES.filter(
    (one) =>
      one.held.every((name) => held.has(name)) &&
      one.tags.every((tag) => equation.tags.includes(tag))
  )
    .map((one) => one.percent)
    .reduce((sum, one) => sum + one, buffed)
  return 1 + percent / 100
}

const SCOPED_HEALING = [{ held: emeraldMoss.slug, line: emeraldMoss.skillLineId, percentEach: 5 }]

export function healingDoneOfSkill(
  healingDone: number,
  line: string | undefined,
  slotted: readonly (string | undefined)[],
  held: ReadonlySet<string>
): number {
  return SCOPED_HEALING.filter((one) => held.has(one.held) && line === one.line).reduce(
    (sum, one) =>
      sum + (one.percentEach / 100) * slotted.filter((other) => other === one.line).length,
    healingDone
  )
}

const POWER_BUFFS: Readonly<Record<string, number>> = {
  "Major Brutality": 0.2,
  "Minor Brutality": 0.1,
}

const POWER_PER_MEDIUM_PIECE = { held: "agility", share: 0.02 }

const POWER_STARS = [
  { star: warMage.slug, types: ["Magic", "Flame", "Frost", "Shock"] },
  { star: mighty.slug, types: ["Physical", "Poison", "Disease", "Bleed"] },
]

const POWER_STAR = { points: 30, power: 100 }

const WRATHFUL_STRIKES = { held: "wrathful-strikes", power: 205 }

function powerShareOf(held: ReadonlySet<string>, active: ActiveHeld): number {
  const buffs = [...active.buffs].reduce((sum, one) => sum + (POWER_BUFFS[one] ?? 0), 0)
  const medium = held.has(POWER_PER_MEDIUM_PIECE.held)
    ? POWER_PER_MEDIUM_PIECE.share * active.mediumPieces
    : 0
  return buffs + medium
}

function isDirectDamage(equation: Equation): boolean {
  return equation.tags.includes(DAMAGE) && equation.tags.includes(DIRECT)
}

function isDamageOverTime(equation: Equation): boolean {
  return equation.tags.includes(DAMAGE) && equation.tags.includes(OVER_TIME)
}

function isOverTime(equation: Equation): boolean {
  const { tags } = equation
  return tags.includes(OVER_TIME) && (tags.includes(DAMAGE) || tags.includes(HEAL))
}

function isDamage(equation: Equation): boolean {
  return isDirectDamage(equation) || isDamageOverTime(equation)
}

function secondsTagged(equation: Equation, pattern: RegExp): number | undefined {
  for (const tag of equation.tags) {
    const matched = pattern.exec(tag)
    if (matched !== null) return Number(matched[1])
  }
  return undefined
}

function ticksOf(equation: Equation, durationMs: number | undefined): number {
  const tagged = secondsTagged(equation, DURATION)
  const tick = secondsTagged(equation, TICK)
  if (!isOverTime(equation) || equation.tags.includes(PER_TICK)) return 1
  if (tagged === undefined || tick === undefined) return 1
  const own = durationMs === undefined || durationMs <= 0 || equation.tags.includes(OWN_DURATION)
  const duration = own ? tagged : durationMs / 1000
  return Math.round(duration / tick) + (equation.tags.includes(ON_APPLICATION) ? 1 : 0)
}

function damagePowerOf(
  equation: Equation,
  power: number,
  held: ReadonlySet<string>,
  active: ActiveHeld
): number {
  if (!isDamage(equation)) return power
  const star = POWER_STARS.find((one) => one.types.some((type) => equation.tags.includes(type)))
  const points = star === undefined ? 0 : (active.championPoints[star.star] ?? 0)
  const flat =
    (points >= POWER_STAR.points ? POWER_STAR.power : 0) +
    (held.has(WRATHFUL_STRIKES.held) ? WRATHFUL_STRIKES.power : 0)
  if (flat === 0) return power
  const grown = 1 + powerShareOf(held, active)
  const base = Math.round(power / grown)
  return power + Math.round((base + flat) * grown) - Math.round(base * grown)
}

const SHIELD_PER_STACK: Readonly<Record<string, number>> = {
  Landslide: 1,
}

function shieldBonusOf(equation: Equation, held: ReadonlySet<string>, active: ActiveHeld): number {
  const stacked = Object.entries(active.stacks).reduce(
    (sum, [buff, stacks]) => sum + (SHIELD_PER_STACK[buff] ?? 0) * stacks,
    0
  )
  return bonusOf(equation, held) + stacked / 100
}

function shieldOf(
  equation: Equation,
  worked: number,
  stats: EquationStats,
  held: ReadonlySet<string>,
  active: ActiveHeld
): number {
  const shield = Math.floor(shieldBonusOf(equation, held, active) * worked)
  return equation.tags.includes(HALF_HEALTH)
    ? Math.min(shield, Math.floor(stats.health / 2))
    : shield
}

function tooltipValueOf(
  equation: Equation | undefined,
  stats: EquationStats,
  passives: ReadonlySet<string>,
  active: ActiveHeld,
  durationMs: number | undefined
): number | undefined {
  if (equation === undefined) return undefined
  const maxPower = damagePowerOf(equation, stats.maxPower, passives, active)
  const worked = equationValue(equation, { ...stats, maxPower })
  if (worked === undefined) return undefined
  if (!equation.scaled) {
    const kept = worked + longerBy(equation, passives)
    if (!equation.tags.includes(SHIELD)) return kept
    return Math.round(shieldBonusOf(equation, passives, active) * kept)
  }
  if (equation.tags.includes(SHIELD)) return shieldOf(equation, worked, stats, passives, active)
  const healing = equation.tags.includes(HEAL)
  const base = healing ? healOf(equation, { ...stats, maxPower }) : worked
  const bonused = bonusOf(equation, passives, active) * stackedOf(equation, active) * base
  const ticks = ticksOf(equation, durationMs)
  if (healing) return Math.round((1 + stats.healingDone) * Math.round(bonused)) * ticks
  if (!isDamage(equation)) return Math.round(bonused)
  return Math.floor(bonused) * ticks
}

const FLOORED: readonly (keyof EquationStats)[] = ["maxStat", "maxPower"]

function healOf(equation: Equation, stats: EquationStats): number {
  return equation.terms.reduce((sum, [variable, by]) => {
    const term = by * stats[variable]
    return sum + (FLOORED.includes(variable) ? Math.floor(term) : term)
  }, equation.constant)
}

export function equationValue(
  equation: Equation | undefined,
  stats: EquationStats
): number | undefined {
  if (equation === undefined || !equation.read) return undefined
  return equation.terms.reduce(
    (sum, [variable, by]) => sum + by * stats[variable],
    equation.constant
  )
}
