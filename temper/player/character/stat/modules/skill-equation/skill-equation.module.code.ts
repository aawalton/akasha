export type EquationStats = {
  readonly maxStat: number
  readonly maxPower: number
  readonly health: number
  readonly magicka: number
  readonly stamina: number
  readonly spellDamage: number
  readonly weaponDamage: number
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

export function equationStatsOf(stats: Readonly<Record<string, number>>): EquationStats {
  const at = (key: string) => stats[key] ?? 0
  return {
    maxStat: Math.max(at("magicka-maximum"), at("stamina-maximum")),
    maxPower: Math.max(at("power-weapon"), at("power-spell")),
    health: at("health-maximum"),
    magicka: at("magicka-maximum"),
    stamina: at("stamina-maximum"),
    spellDamage: at("power-spell"),
    weaponDamage: at("power-weapon"),
  }
}

export function shownNumbersOf(description: string): readonly number[] {
  return [...description.matchAll(SHOWN)].map((one) => Number(one[1]))
}

export function tooltipPairingOf(
  description: string,
  equations: readonly string[],
  stats: EquationStats,
  passives: ReadonlySet<string>
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
      temper: tooltipValueOf(equation, stats, passives) ?? null,
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

function tooltipValueOf(
  equation: Equation | undefined,
  stats: EquationStats,
  passives: ReadonlySet<string>
): number | undefined {
  const worked = equationValue(equation, stats)
  if (worked === undefined || equation === undefined) return undefined
  return equation.scaled ? Math.round(worked) : worked + longerBy(equation, passives)
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
