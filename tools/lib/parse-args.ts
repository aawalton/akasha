import { readFileSync } from "node:fs"
import type { InputError, UnknownFlag } from "@akasha/errors-core/exit-code"
import { expandTilde } from "@akasha/utils-fs/expand-tilde"
import { inputError } from "./exit.ts"
import "./command-entry.ts"
import type { CommandHelp, HelpFlag } from "@akasha/command-system/command-declaring"
import {
  expandProseRoutes,
  normalizeRouteValue,
  planProseRouteReads,
} from "@akasha/command-system/prose-routing"
import { suggestClosest } from "@akasha/temper-build-deploy-checks/suggest-closest"

export interface ParsedArgs {
  string: (name: string) => string | undefined
  requireString: (name: string) => string
  nonNegativeInt: (name: string) => number | undefined
  requireNonNegativeInt: (name: string) => number
  repeated: (name: string) => readonly string[]
  boolean: (name: string) => boolean
  readonly positionals: readonly string[]
  env: (name: string) => string | undefined
  requireEnv: (name: string) => string
}

interface FlagDef {
  readonly help: HelpFlag
  readonly name: string
}

interface FlagLookup {
  readonly bySurfaceName: Map<string, FlagDef>
  readonly canonical: Map<string, FlagDef>
  readonly allSurfaceNames: readonly string[]
}

function buildFlagMap(flags: readonly HelpFlag[]): FlagLookup {
  const bySurfaceName = new Map<string, FlagDef>()
  const canonical = new Map<string, FlagDef>()
  const allSurfaceNames: string[] = []
  for (const f of flags) {
    const def: FlagDef = { help: f, name: f.name }
    if (f.argLabel === undefined) {
      if (f.valueShape !== undefined)
        throw new Error(`flag ${f.name} declares valueShape but takes no value`)
      if (f.acceptsStdin === true)
        throw new Error(`flag ${f.name} declares acceptsStdin but takes no value`)
    }
    if (f.deprecatedChoices !== undefined && f.choices === undefined)
      throw new Error(`flag ${f.name} declares deprecatedChoices but no choices`)
    if (bySurfaceName.has(f.name)) throw new Error(`duplicate flag declaration: ${f.name}`)
    bySurfaceName.set(f.name, def)
    canonical.set(f.name, def)
    allSurfaceNames.push(f.name)
    for (const alias of f.aliases ?? []) {
      if (bySurfaceName.has(alias)) throw new Error(`duplicate flag declaration: ${alias}`)
      bySurfaceName.set(alias, def)
      allSurfaceNames.push(alias)
    }
  }
  return { bySurfaceName, canonical, allSurfaceNames }
}

function takesValue(f: HelpFlag): boolean {
  return f.argLabel !== undefined
}

function readRouteValue(path: string): string {
  const resolved = expandTilde(path)
  try {
    return resolved === "-" ? readFileSync(0, "utf8") : readFileSync(resolved, "utf8")
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err)
    throw inputError(`failed to read ${path}: ${reason}`)
  }
}

export type { UnknownFlag } from "@akasha/errors-core/exit-code"

function unknownFlagError(
  flagName: string,
  candidates: readonly string[]
): InputError & { readonly unknownFlag: UnknownFlag } {
  const suggestion = suggestClosest(flagName, candidates, 2)
  const message =
    suggestion !== undefined
      ? `unknown flag: ${flagName} (did you mean ${suggestion}?)`
      : `unknown flag: ${flagName}`
  return Object.assign(inputError(message), { unknownFlag: { name: flagName, suggestion } })
}

export function parseArgs(help: CommandHelp, argv: readonly string[]): ParsedArgs {
  const proseRoutes = expandProseRoutes(help.flags ?? [])
  const flagLookup = buildFlagMap(proseRoutes.flags)
  const flagDefs = flagLookup.canonical
  const positionalDefs = help.positionals ?? []
  const envDefs = help.envVars ?? []
  const exclusiveGroups = help.mutuallyExclusive ?? []

  const flagValues = new Map<string, string | string[] | true>()
  const flagSurfaceNames = new Map<string, string>()
  const positionals: string[] = []

  for (let i = 0; i < argv.length; i++) {
    const tok = argv[i]
    if (tok === undefined) break
    if (tok === "--") {
      positionals.push(...argv.slice(i + 1))
      break
    }
    if (tok.startsWith("--")) {
      const eq = tok.indexOf("=")
      const surfaceName = eq >= 0 ? tok.slice(0, eq) : tok
      const inlineValue = eq >= 0 ? tok.slice(eq + 1) : undefined
      const def = flagLookup.bySurfaceName.get(surfaceName)
      if (!def) throw unknownFlagError(surfaceName, flagLookup.allSurfaceNames)
      const canonical = def.name
      if (takesValue(def.help)) {
        let value: string
        if (inlineValue !== undefined) {
          value = inlineValue
        } else {
          i++
          const next = argv[i]
          if (next === undefined) throw inputError(`${surfaceName} requires a value`)
          value = next
        }
        if (
          def.help.choices &&
          !def.help.choices.includes(value) &&
          def.help.deprecatedChoices?.includes(value) !== true
        ) {
          throw inputError(
            `${surfaceName}: invalid value "${value}" (expected one of: ${def.help.choices.join(", ")})`
          )
        }
        if (def.help.repeat) {
          const existing = flagValues.get(canonical)
          if (Array.isArray(existing)) existing.push(value)
          else flagValues.set(canonical, [value])
        } else {
          const existing = flagValues.get(canonical)
          if (existing !== undefined) {
            const firstSurface = flagSurfaceNames.get(canonical) ?? canonical
            if (firstSurface === surfaceName) {
              throw inputError(`${surfaceName}: flag given more than once`)
            }
            if (existing !== value) {
              throw inputError(
                `${canonical}: cannot be set both as ${firstSurface} and ${surfaceName} (got '${existing}' vs '${value}')`
              )
            }
          } else {
            flagValues.set(canonical, value)
            flagSurfaceNames.set(canonical, surfaceName)
          }
        }
      } else {
        if (inlineValue !== undefined)
          throw inputError(`${surfaceName}: flag does not accept a value`)
        const existing = flagValues.get(canonical)
        if (existing !== undefined) {
          const firstSurface = flagSurfaceNames.get(canonical) ?? canonical
          if (firstSurface === surfaceName) {
            throw inputError(`${surfaceName}: flag given more than once`)
          }
        } else {
          flagValues.set(canonical, true)
          flagSurfaceNames.set(canonical, surfaceName)
        }
      }
      continue
    }
    positionals.push(tok)
  }

  let sawNonAlias = false
  for (const pdef of positionalDefs) {
    if (pdef.aliasOfFlag === undefined) {
      sawNonAlias = true
      continue
    }
    if (sawNonAlias)
      throw new Error(
        `positional ${pdef.name} (aliasOfFlag ${pdef.aliasOfFlag}) must not follow a non-aliased positional`
      )
    const flagName = pdef.aliasOfFlag
    const flagDef = flagDefs.get(flagName)
    if (!flagDef)
      throw new Error(
        `positional ${pdef.name} aliases unknown flag ${flagName} — fix the command's CommandHelp`
      )
    if (pdef.required === true || pdef.variadic === true)
      throw new Error(
        `positional ${pdef.name} aliases ${flagName} but must be required:false and non-variadic`
      )
    if (flagDef.help.repeat === true || flagDef.help.argLabel === undefined)
      throw new Error(
        `positional ${pdef.name} aliases ${flagName}, which must be a single-value flag`
      )
    const positionalValue = positionals[0]
    if (positionalValue === undefined) continue
    const existing = flagValues.get(flagName)
    if (typeof existing === "string" && existing !== positionalValue) {
      throw inputError(
        `${flagName}: cannot be set both as positional ${pdef.name} and flag (got '${positionalValue}' vs '${existing}')`
      )
    }
    flagValues.set(flagName, positionalValue)
    positionals.shift()
  }

  for (const read of planProseRouteReads(proseRoutes.synthesized, flagValues)) {
    const values = read.paths.map((p) => normalizeRouteValue(readRouteValue(p), read.valueShape))
    flagValues.delete(read.routeFlag)
    flagSurfaceNames.delete(read.routeFlag)
    const single = values.length === 1 ? values[0] : undefined
    const repeats = flagDefs.get(read.proseFlag)?.help.repeat === true
    flagValues.set(read.proseFlag, repeats || single === undefined ? values : single)
    flagSurfaceNames.set(read.proseFlag, read.routeFlag)
  }

  const nonAliasPositionalDefs = positionalDefs.filter((p) => p.aliasOfFlag === undefined)
  const surplusPositionals = nonAliasPositionalDefs.some((p) => p.variadic)
    ? []
    : positionals.slice(nonAliasPositionalDefs.length)

  for (const f of flagDefs.values()) {
    if (f.help.required && !flagValues.has(f.name)) {
      const stray = surplusPositionals[0]
      if (stray !== undefined && f.help.argLabel !== undefined)
        throw inputError(
          `${f.name}: required flag missing (got positional '${stray}'; this command takes it as a flag: ${f.name} ${stray})`
        )
      throw inputError(`${f.name}: required flag missing`)
    }
  }

  for (const group of exclusiveGroups) {
    const present = group.filter((n) => flagValues.has(n))
    if (present.length >= 2)
      throw inputError(`mutually exclusive flags given together: ${present.join(", ")}`)
  }

  const requiredPositionalCount = nonAliasPositionalDefs.filter(
    (p) => p.required !== false && !p.variadic
  ).length
  if (positionals.length < requiredPositionalCount) {
    const missing = nonAliasPositionalDefs
      .slice(positionals.length, requiredPositionalCount)
      .map((p) => p.name)
    throw inputError(`missing required positional argument(s): ${missing.join(", ")}`)
  }
  const hasVariadic = nonAliasPositionalDefs.some((p) => p.variadic)
  if (!hasVariadic && positionals.length > nonAliasPositionalDefs.length) {
    const extras = positionals.slice(nonAliasPositionalDefs.length)
    throw inputError(`unexpected positional argument(s): ${extras.join(" ")}`)
  }

  const envValues = new Map<string, string>()
  for (const ev of envDefs) {
    const raw = process.env[ev.name]
    const resolved = raw !== undefined ? raw : ev.default
    if (resolved !== undefined) {
      envValues.set(ev.name, ev.path === true ? expandTilde(resolved) : resolved)
    } else if (ev.required) {
      throw inputError(`required env var ${ev.name} is not set`)
    }
  }

  return {
    string(name: string): string | undefined {
      const v = flagValues.get(name)
      const def = flagDefs.get(name)
      let result: string | undefined
      if (typeof v === "string") result = v
      else if (v === true || Array.isArray(v)) result = undefined
      else result = def?.help.default
      if (result !== undefined && def?.help.path === true) return expandTilde(result)
      return result
    },
    requireString(name: string): string {
      const v = this.string(name)
      if (v === undefined) throw inputError(`${name}: required value missing`)
      return v
    },
    nonNegativeInt(name: string): number | undefined {
      const v = this.string(name)
      if (v === undefined) return undefined
      const n = Number(v)
      if (!Number.isFinite(n) || !Number.isInteger(n) || n < 0)
        throw inputError(`${name} must be a non-negative integer, got: ${v}`)
      return n
    },
    requireNonNegativeInt(name: string): number {
      const v = this.requireString(name)
      const n = Number(v)
      if (!Number.isFinite(n) || !Number.isInteger(n) || n < 0)
        throw inputError(`${name} must be a non-negative integer, got: ${v}`)
      return n
    },
    repeated(name: string): readonly string[] {
      const v = flagValues.get(name)
      if (!Array.isArray(v)) return []
      const def = flagDefs.get(name)
      if (def?.help.path === true) return v.map((s) => expandTilde(s))
      return v
    },
    boolean(name: string): boolean {
      return flagValues.get(name) === true
    },
    positionals: Object.freeze(positionals.slice()),
    env(name: string): string | undefined {
      return envValues.get(name)
    },
    requireEnv(name: string): string {
      const v = envValues.get(name)
      if (v === undefined) throw inputError(`env var ${name} is not set`)
      return v
    },
  }
}
