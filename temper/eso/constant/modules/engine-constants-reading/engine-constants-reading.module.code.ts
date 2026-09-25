import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { accountWideHolding } from "akasha/temper/eso/saved-variable/modules/account-wide/account-wide.module.code.ts"
import { parseLuaSavedVariablesFile } from "akasha/temper/eso/saved-variable/modules/lua-parser/lua-parser.module.code.ts"

const TOP_LEVEL = "TemperCatalog_SavedVariables"

const HELD = "engineGlobalsCatalog"

const NOTHING = 0

export interface EngineConstants {
  readonly apiVersion: number
  readonly listedBy: string
  readonly numbers: Readonly<Record<string, number>>
  readonly words: Readonly<Record<string, string>>
  readonly named: readonly string[]
  readonly unwritable: readonly string[]
}

export function listed(held: unknown): readonly string[] {
  const every = Array.isArray(held) ? held : isRecord(held) ? Object.values(held) : []
  return every.filter((one): one is string => typeof one === "string").sort()
}

function sortedNumbers(held: unknown): Record<string, number> {
  const out: Record<string, number> = {}
  if (!isRecord(held)) return out
  for (const name of Object.keys(held).sort()) {
    const value = held[name]
    if (typeof value === "number") out[name] = value
  }
  return out
}

export function sortedWords(held: unknown): Record<string, string> {
  const out: Record<string, string> = {}
  if (!isRecord(held)) return out
  for (const name of Object.keys(held).sort()) {
    const value = held[name]
    if (typeof value === "string") out[name] = value
  }
  return out
}

export function engineConstantsIn(content: string): EngineConstants | undefined {
  let root: Record<string, unknown>
  try {
    root = parseLuaSavedVariablesFile(content, TOP_LEVEL)
  } catch {
    return undefined
  }
  const catalog = accountWideHolding(root, HELD)
  if (catalog === undefined) return undefined
  return {
    apiVersion: typeof catalog.apiVersion === "number" ? catalog.apiVersion : NOTHING,
    listedBy: typeof catalog.listedBy === "string" ? catalog.listedBy : "",
    numbers: sortedNumbers(catalog.numbers),
    words: sortedWords(catalog.words),
    named: listed(catalog.named),
    unwritable: listed(catalog.unwritable),
  }
}

export function constantsBody(held: EngineConstants): string {
  return `${JSON.stringify(held, null, 2)}\n`
}
