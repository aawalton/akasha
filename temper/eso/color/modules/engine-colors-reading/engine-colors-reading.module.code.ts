import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { accountWideHolding } from "akasha/temper/eso/saved-variable/modules/account-wide/account-wide.module.code.ts"
import { parseLuaSavedVariablesFile } from "akasha/temper/eso/saved-variable/modules/lua-parser/lua-parser.module.code.ts"

const TOP_LEVEL = "TemperCatalog_SavedVariables"

const HELD = "interfaceColorCatalog"

const NOTHING = 0

const CHANNELS = ["red", "green", "blue", "alpha"] as const

type EngineColor = readonly [number, number, number, number]

export interface EngineColors {
  readonly apiVersion: number
  readonly colors: Readonly<Record<string, Readonly<Record<string, EngineColor>>>>
}

function entriesOf(held: unknown): readonly unknown[] {
  if (Array.isArray(held)) return held
  return isRecord(held) ? Object.values(held) : []
}

function colorOf(entry: Record<string, unknown>): EngineColor | undefined {
  const found: number[] = []
  for (const channel of CHANNELS) {
    const value = entry[channel]
    if (typeof value !== "number") return undefined
    found.push(value)
  }
  const [red = NOTHING, green = NOTHING, blue = NOTHING, alpha = NOTHING] = found
  return [red, green, blue, alpha]
}

function byNumber(a: string, b: string): number {
  return Number(a) - Number(b)
}

function sortedColors(
  found: Map<string, Map<string, EngineColor>>
): Record<string, Record<string, EngineColor>> {
  const out: Record<string, Record<string, EngineColor>> = {}
  for (const type of [...found.keys()].sort(byNumber)) {
    const fields = found.get(type) ?? new Map<string, EngineColor>()
    const inner: Record<string, EngineColor> = {}
    for (const field of [...fields.keys()].sort(byNumber)) {
      const color = fields.get(field)
      if (color !== undefined) inner[field] = color
    }
    out[type] = inner
  }
  return out
}

export function engineColorsIn(content: string): EngineColors | undefined {
  let root: Record<string, unknown>
  try {
    root = parseLuaSavedVariablesFile(content, TOP_LEVEL)
  } catch {
    return undefined
  }
  const catalog = accountWideHolding(root, HELD)
  if (catalog === undefined) return undefined
  const found = new Map<string, Map<string, EngineColor>>()
  for (const entry of entriesOf(catalog.colors)) {
    if (!isRecord(entry)) continue
    const { type, field } = entry
    const color = colorOf(entry)
    if (typeof type !== "number" || typeof field !== "number" || color === undefined) continue
    const fields = found.get(String(type)) ?? new Map<string, EngineColor>()
    fields.set(String(field), color)
    found.set(String(type), fields)
  }
  return {
    apiVersion: typeof catalog.apiVersion === "number" ? catalog.apiVersion : NOTHING,
    colors: sortedColors(found),
  }
}

export function colorsBody(held: EngineColors): string {
  return `${JSON.stringify(held, null, 2)}\n`
}
