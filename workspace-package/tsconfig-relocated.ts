import { type Landed, relocatedPath } from "./relocated-path.ts"

const TRAILING_COMMA = /,(\s*[}\]])/g

const PATH_KEYS: readonly string[] = ["rootDir", "outDir", "tsBuildInfoFile", "baseUrl"]

export interface Renamed {
  readonly spec: string
  readonly to: string
}

export interface TsconfigRelocation {
  readonly body: string
  readonly renamed: readonly Renamed[]
  readonly refused: readonly string[]
}

function held(value: unknown): Record<string, unknown> | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null
  return value as Record<string, unknown>
}

function stringsIn(value: unknown): readonly string[] {
  if (!Array.isArray(value)) return []
  return value.filter((one): one is string => typeof one === "string")
}

export function parsed(body: string): Record<string, unknown> | null {
  try {
    return held(JSON.parse(body.replace(TRAILING_COMMA, "$1")))
  } catch {
    return null
  }
}

export function specsIn(config: Record<string, unknown>): readonly string[] {
  const found: string[] = []
  if (typeof config.extends === "string") found.push(config.extends)
  const options = held(config.compilerOptions)
  if (options !== null) {
    for (const key of PATH_KEYS) {
      const said = options[key]
      if (typeof said === "string") found.push(said)
    }
    const paths = held(options.paths)
    if (paths !== null) for (const value of Object.values(paths)) found.push(...stringsIn(value))
  }
  found.push(...stringsIn(config.include), ...stringsIn(config.exclude), ...stringsIn(config.files))
  if (Array.isArray(config.references)) {
    for (const one of config.references) {
      const ref = held(one)
      if (ref !== null && typeof ref.path === "string") found.push(ref.path)
    }
  }
  return [...new Set(found)]
}

export function quotedSwap(body: string, spec: string, to: string): string {
  return body.split(JSON.stringify(spec)).join(JSON.stringify(to))
}

export function tsconfigRelocated(
  body: string,
  fromDir: string,
  toDir: string,
  landed: readonly Landed[],
  blocked: readonly string[] = []
): TsconfigRelocation | null {
  const config = parsed(body)
  if (config === null) return null
  const renamed: Renamed[] = []
  const refused: string[] = []
  let said = body
  for (const spec of specsIn(config)) {
    const to = relocatedPath(fromDir, toDir, spec, landed, blocked)
    if (to === null) {
      refused.push(spec)
      continue
    }
    if (to === spec) continue
    said = quotedSwap(said, spec, to)
    renamed.push({ spec, to })
  }
  return { body: said, renamed, refused }
}
