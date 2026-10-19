import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"

const NO_VERSION = 0

export interface EngineStrings {
  readonly apiVersion: number
  readonly strings: Readonly<Record<string, string>>
}

export function engineStringsIn(
  catalog: Readonly<Record<string, unknown>> | undefined
): EngineStrings | undefined {
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
