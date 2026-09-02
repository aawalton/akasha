import * as luaParserModule from "@akasha/temper-saved-variables/lua-parser"
import * as addonsResolveModule from "@akasha/temper-addons-resolve/addon-roster"
import type { ErrorEntry } from "@akasha/temper-capture-errors/errors-payload"
import * as collectModule from "@temper/shared-capture-errors-decision-core/collect"
import * as livenessModule from "@temper/shared-capture-errors-decision-core/liveness"
import * as savedVariablesSchemaModule from "@temper/shared-capture-errors-decision-core/saved-variables-schema"
import type { InferredCulprit } from "@temper/shared-capture-errors-decision-core/triage"
import * as triageGatherModule from "@temper/shared-capture-errors-decision-core/triage-gather"

export type { Ownership } from "@temper/shared-capture-errors-decision-core/liveness"
export type { ErrorEntry, InferredCulprit }

// Each of these names a whole module a caller is handed, not a value inside
// one. The decision core exports a `Liveness` of its own — the live/stale
// verdict — so the module shape keeps this name here rather than taking that
// one.
export type AddonsResolve = typeof addonsResolveModule
export type Collect = typeof collectModule
export type Liveness = typeof livenessModule
export type SavedVariablesSchema = typeof savedVariablesSchemaModule
export type TriageGather = typeof triageGatherModule
export type LuaParser = typeof luaParserModule

export interface ClassifiedEntry {
  readonly entry: ErrorEntry
  readonly verdict: string
  readonly reason: unknown
  readonly triage: string
  readonly triageReason: unknown
  readonly inferred?: InferredCulprit
}

export function addonsResolve(): Promise<AddonsResolve> {
  return Promise.resolve(addonsResolveModule)
}

export function errorsCollect(): Promise<Collect> {
  return Promise.resolve(collectModule)
}

export function errorsLiveness(): Promise<Liveness> {
  return Promise.resolve(livenessModule)
}

export function errorsSavedVariablesSchema(): Promise<SavedVariablesSchema> {
  return Promise.resolve(savedVariablesSchemaModule)
}

export function errorsTriageGather(): Promise<TriageGather> {
  return Promise.resolve(triageGatherModule)
}

export function luaParser(): Promise<LuaParser> {
  return Promise.resolve(luaParserModule)
}
