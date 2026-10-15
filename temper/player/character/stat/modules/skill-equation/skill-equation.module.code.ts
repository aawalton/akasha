export type EquationStats = {
  readonly maxStat: number
  readonly maxPower: number
  readonly health: number
  readonly magicka: number
  readonly stamina: number
  readonly spellDamage: number
  readonly weaponDamage: number
}

export type Equation = {
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

const LINE = /^<<(\d+)>> = (.*?)(?: \(([^()]*)\))?$/

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
