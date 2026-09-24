import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { accountWideHolding } from "akasha/temper/eso/saved-variable/modules/account-wide/account-wide.module.code.ts"
import { parseLuaSavedVariablesFile } from "akasha/temper/eso/saved-variable/modules/lua-parser/lua-parser.module.code.ts"

const TOP_LEVEL = "TemperCatalog_SavedVariables"

const HELD = "interfaceStringCatalog"

const NO_VERSION = 0

export interface EngineStrings {
  readonly apiVersion: number
  readonly strings: Readonly<Record<string, string>>
}

export function engineStringsIn(content: string): EngineStrings | undefined {
  let root: Record<string, unknown>
  try {
    root = parseLuaSavedVariablesFile(content, TOP_LEVEL)
  } catch {
    return undefined
  }
  const catalog = accountWideHolding(root, HELD)
  if (catalog === undefined || !isRecord(catalog.strings)) return undefined
  const given = catalog.strings
  const strings: Record<string, string> = {}
  for (const name of Object.keys(given).sort()) {
    const text = given[name]
    if (typeof text === "string") strings[name] = text
  }
  return {
    apiVersion: typeof catalog.apiVersion === "number" ? catalog.apiVersion : NO_VERSION,
    strings,
  }
}

export function stringsBody(held: EngineStrings): string {
  return `${JSON.stringify(held, null, 2)}\n`
}
