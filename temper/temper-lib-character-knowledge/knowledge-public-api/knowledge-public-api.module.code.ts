import { asGlobalTable, asNumber } from "../knowledge-casts/knowledge-casts.module.code.ts"
import { LCCC } from "../knowledge-lccc/knowledge-lccc.module.code.ts"
import { LDEI } from "../knowledge-ldei/knowledge-ldei.module.code.ts"
import { INTERNAL, PUBLIC } from "../knowledge-state/knowledge-state.module.code.ts"

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

const glob = asGlobalTable(globalThis)

glob.LibCharacterKnowledge = PUBLIC
glob.LibCharacterKnowledgeInternal = INTERNAL

publishVersioned("LibCodesCommonCode", LCCC)
publishVersioned("LibDataExportImport", LDEI)
