import { asNumber } from "./casts"
import { Internal, Public } from "./internal/state"
import { LCCC } from "./lccc"
import { LDEI } from "./ldei"

type GlobalTable = Record<string, unknown>
function asGlobalTable(value: unknown): GlobalTable {
  return value as GlobalTable
}

type Versioned = { version?: unknown } | undefined
function asVersioned(value: unknown): Versioned {
  return value as Versioned
}

export function publishVersioned(this: void, name: string, lib: { version: number }): undefined {
  const existing = asVersioned(asGlobalTable(globalThis)[name])
  if (
    !(
      type(existing) === "table" &&
      type(existing?.version) === "number" &&
      asNumber(existing?.version) >= lib.version
    )
  ) {
    asGlobalTable(globalThis)[name] = lib
  }
}

globalThis.LibCharacterKnowledge = Public
globalThis.LibCharacterKnowledgeInternal = Internal

publishVersioned("LibCodesCommonCode", LCCC)
publishVersioned("LibDataExportImport", LDEI)
