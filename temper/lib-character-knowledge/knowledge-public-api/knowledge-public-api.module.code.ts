import {
  asGlobalTable,
  asNumber,
} from "akasha/temper/lib-character-knowledge/knowledge-casts/knowledge-casts.module.code.ts"
import { LDEI } from "akasha/temper/lib-character-knowledge/knowledge-ldei/knowledge-ldei.module.code.ts"
import {
  INTERNAL,
  PUBLIC,
} from "akasha/temper/lib-character-knowledge/knowledge-state/knowledge-state.module.code.ts"

type Versioned = { version?: unknown } | undefined
function asVersioned(value: unknown): Versioned {
  return value as Versioned
}

function publishVersioned(this: void, name: string, lib: { version: number }): undefined {
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

const glob = asGlobalTable(globalThis)

glob.LibCharacterKnowledge = PUBLIC
glob.LibCharacterKnowledgeInternal = INTERNAL

publishVersioned("LibDataExportImport", LDEI)
