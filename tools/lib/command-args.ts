
import { InputError } from "./active-core.ts"

export type CommandHelpFlag =
  | { readonly name: string; readonly description: string; readonly argLabel?: undefined }
  | {
      readonly name: string
      readonly description: string
      readonly argLabel: string
      readonly valueShape: string
    }

export interface CommandHelp {
  readonly description: string
  readonly flags?: readonly CommandHelpFlag[]
  readonly examples?: readonly string[]
}

export interface ParsedCommandArgs {
  string: (name: string) => string | undefined
  boolean: (name: string) => boolean
  readonly positionals: readonly string[]
}

export function levenshtein(a: string, b: string): number {
  if (a === b) return 0
  if (a.length === 0) return b.length
  if (b.length === 0) return a.length
  const prev: number[] = new Array(b.length + 1)
  const curr: number[] = new Array(b.length + 1)
  for (let j = 0; j <= b.length; j++) prev[j] = j
  for (let i = 1; i <= a.length; i++) {
    curr[0] = i
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      const del = (prev[j] ?? 0) + 1
      const ins = (curr[j - 1] ?? 0) + 1
      const sub = (prev[j - 1] ?? 0) + cost
      curr[j] = Math.min(del, ins, sub)
    }
    for (let j = 0; j <= b.length; j++) prev[j] = curr[j] ?? 0
  }
  return prev[b.length] ?? 0
}

export function suggestClosest(
  input: string,
  candidates: readonly string[],
  maxDistance: number
): string | undefined {
  let best: { name: string; distance: number } | undefined
  for (const candidate of candidates) {
    const distance = levenshtein(input, candidate)
    if (distance > maxDistance) continue
    if (best === undefined || distance < best.distance) best = { name: candidate, distance }
  }
  return best?.name
}

export function parseCommandArgs(help: CommandHelp, argv: readonly string[]): ParsedCommandArgs {
  const flags = help.flags ?? []
  const byName = new Map<string, CommandHelpFlag>()
  const names: string[] = []
  for (const flag of flags) {
    if (byName.has(flag.name)) throw new Error(`duplicate flag declaration: ${flag.name}`)
    if (flag.argLabel !== undefined && (flag.valueShape === "prose" || flag.valueShape === "line")) {
      throw new Error(
        `flag ${flag.name} declares valueShape "${flag.valueShape}", which synthesizes a ` +
          `${flag.name}-file route in the standing parser and is not implemented here`
      )
    }
    byName.set(flag.name, flag)
    names.push(flag.name)
  }

  const values = new Map<string, string | true>()
  const positionals: string[] = []

  for (let i = 0; i < argv.length; i++) {
    const token = argv[i]
    if (token === undefined) break
    if (token === "--") {
      positionals.push(...argv.slice(i + 1))
      break
    }
    if (!token.startsWith("--")) {
      positionals.push(token)
      continue
    }

    const eq = token.indexOf("=")
    const name = eq >= 0 ? token.slice(0, eq) : token
    const inline = eq >= 0 ? token.slice(eq + 1) : undefined
    const flag = byName.get(name)
    if (flag === undefined) {
      const suggestion = suggestClosest(name, names, 2)
      throw new InputError(
        suggestion !== undefined
          ? `unknown flag: ${name} (did you mean ${suggestion}?)`
          : `unknown flag: ${name}`
      )
    }

    if (flag.argLabel === undefined) {
      if (inline !== undefined) throw new InputError(`${name}: flag does not accept a value`)
      if (values.get(name) !== undefined) throw new InputError(`${name}: flag given more than once`)
      values.set(name, true)
      continue
    }

    let value: string
    if (inline !== undefined) {
      value = inline
    } else {
      i++
      const next = argv[i]
      if (next === undefined) throw new InputError(`${name} requires a value`)
      value = next
    }
    if (values.get(name) !== undefined) throw new InputError(`${name}: flag given more than once`)
    values.set(name, value)
  }

  if (positionals.length > 0) {
    throw new InputError(`unexpected positional argument(s): ${positionals.join(" ")}`)
  }

  return {
    string(name: string): string | undefined {
      const held = values.get(name)
      return typeof held === "string" ? held : undefined
    },
    boolean(name: string): boolean {
      return values.get(name) === true
    },
    positionals: Object.freeze(positionals.slice()),
  }
}
