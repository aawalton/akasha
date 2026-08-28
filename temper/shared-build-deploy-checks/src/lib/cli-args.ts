import { assertNever } from "../../../../shared/utils-narrow/src/assert-never.ts"
import { suggestClosest } from "./suggest-closest.ts"

export type FlagSpec =
  | { readonly kind: "boolean"; readonly default?: boolean }
  | { readonly kind: "string"; readonly default?: string; readonly required?: boolean }
  | { readonly kind: "number"; readonly default?: number; readonly required?: boolean }
  | { readonly kind: "csv"; readonly default?: readonly string[] }

type FlagValue<F extends FlagSpec> = F extends { kind: "boolean" }
  ? boolean
  : F extends { kind: "string"; required: true }
    ? string
    : F extends { kind: "string"; default: string }
      ? string
      : F extends { kind: "string" }
        ? string | undefined
        : F extends { kind: "number"; required: true }
          ? number
          : F extends { kind: "number"; default: number }
            ? number
            : F extends { kind: "number" }
              ? number | undefined
              : F extends { kind: "csv" }
                ? readonly string[]
                : never

export type FlagsResult<F extends Record<string, FlagSpec>> = {
  readonly [K in keyof F]: FlagValue<F[K]>
}

export interface ParsedArgs<F extends Record<string, FlagSpec>> {
  readonly flags: FlagsResult<F>
  readonly positionals: readonly string[]
  readonly raw: readonly string[]
}

function asFlagsResult<F extends Record<string, FlagSpec>>(
  flags: Record<string, unknown>
): FlagsResult<F> {
  return flags as FlagsResult<F>
}

export interface ParseOptions {
  readonly passthrough?: boolean
}

const camelToKebab = (s: string): string => s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)

const kebabFor = (name: string): string => `--${camelToKebab(name)}`

const isFlagToken = (s: string): boolean => s.startsWith("--")

const TYPO_MAX_DISTANCE = 2

function unknownFlagError(head: string, declared: readonly string[]): Error {
  const suggestion = suggestClosest(head, declared, TYPO_MAX_DISTANCE)
  return new Error(
    suggestion === undefined
      ? `Unknown flag: ${head}`
      : `Unknown flag: ${head} (did you mean ${suggestion}?)`
  )
}

function coerceValue(
  flagName: string,
  spec: FlagSpec,
  raw: string
): boolean | string | number | readonly string[] {
  switch (spec.kind) {
    case "boolean":
      throw new Error(`Flag --${camelToKebab(flagName)} is boolean and takes no value`)
    case "string":
      return raw
    case "number": {
      const n = Number(raw)
      if (Number.isNaN(n)) {
        throw new Error(`Flag --${camelToKebab(flagName)} expects a number, got: ${raw}`)
      }
      return n
    }
    case "csv":
      return raw
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
    default:
      assertNever(spec)
  }
}

export function parseArgs<F extends Record<string, FlagSpec>>(
  argv: readonly string[],
  spec: F,
  options: ParseOptions = {}
): ParsedArgs<F> {
  const byKebab = new Map<string, string>()
  for (const name of Object.keys(spec)) byKebab.set(kebabFor(name), name)

  const seen = new Set<string>()
  const flags: Record<string, unknown> = {}
  const positionals: string[] = []
  const raw: string[] = []

  for (let i = 0; i < argv.length; i++) {
    const tok = argv[i]
    if (tok === undefined) continue
    if (!isFlagToken(tok)) {
      positionals.push(tok)
      continue
    }
    const eq = tok.indexOf("=")
    const head = eq === -1 ? tok : tok.slice(0, eq)
    const inlineValue = eq === -1 ? null : tok.slice(eq + 1)
    const camel = byKebab.get(head)
    if (camel === undefined) {
      const declared = [...byKebab.keys()]
      if (options.passthrough && suggestClosest(head, declared, TYPO_MAX_DISTANCE) === undefined) {
        raw.push(tok)
        continue
      }
      throw unknownFlagError(head, declared)
    }
    const flagSpec = spec[camel]
    if (flagSpec === undefined) {
      throw new Error(`Internal error: missing flag spec for ${camel}`)
    }
    if (flagSpec.kind === "boolean") {
      if (inlineValue !== null) {
        throw new Error(`Flag ${head} is boolean and takes no value`)
      }
      flags[camel] = true
      seen.add(camel)
      continue
    }
    let valueRaw: string
    if (inlineValue !== null) {
      valueRaw = inlineValue
    } else {
      const next = argv[i + 1]
      if (next === undefined || isFlagToken(next)) {
        throw new Error(`Flag ${head} requires a value`)
      }
      valueRaw = next
      i++
    }
    flags[camel] = coerceValue(camel, flagSpec, valueRaw)
    seen.add(camel)
  }

  for (const [name, flagSpec] of Object.entries(spec)) {
    if (seen.has(name)) continue
    if (flagSpec.kind === "boolean") {
      flags[name] = flagSpec.default ?? false
      continue
    }
    if (flagSpec.kind === "csv") {
      flags[name] = flagSpec.default ?? []
      continue
    }
    if (flagSpec.default !== undefined) {
      flags[name] = flagSpec.default
      continue
    }
    if ("required" in flagSpec && flagSpec.required) {
      throw new Error(`Required flag missing: ${kebabFor(name)}`)
    }
    flags[name] = undefined
  }

  return {
    flags: asFlagsResult<F>(flags),
    positionals,
    raw,
  }
}

export const REPO_ROOT_FLAG = {
  repoRoot: { kind: "string" },
} as const satisfies Record<string, FlagSpec>

export const STANDARD_FLAGS = {
  json: { kind: "boolean" },
  repoRoot: { kind: "string" },
  config: { kind: "string" },
  only: { kind: "csv" },
  verbose: { kind: "boolean" },
} as const satisfies Record<string, FlagSpec>
