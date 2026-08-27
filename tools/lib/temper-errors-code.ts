import { listAllAddons } from "@temper/shared-build-deploy-addons-resolve"
import type { ErrorEntry } from "@temper/shared-capture-errors-core/types"
import {
  collectEntries,
  SAVED_VARIABLES_NAME,
} from "@temper/shared-capture-errors-decision-core/collect"
import {
  classifyLiveness,
  DEFAULT_STALE_AFTER_HOURS,
  extractOwningAddonCandidates,
  type Liveness as LivenessVerdict,
  type LivenessReason,
  type Ownership,
} from "@temper/shared-capture-errors-decision-core/liveness"
import { rootSchema } from "@temper/shared-capture-errors-decision-core/saved-variables-schema"
import type {
  InferredCulprit,
  Triage,
  TriageReason,
} from "@temper/shared-capture-errors-decision-core/triage"
import {
  gatherTriage,
  readDeployedBuildId,
} from "@temper/shared-capture-errors-decision-core/triage-gather"
import { parseLuaSavedVariablesFile } from "@temper/shared-saved-variables/lua-parser"

export type { ErrorEntry, InferredCulprit, Ownership }

export interface ClassifiedEntry {
  readonly entry: ErrorEntry
  readonly verdict: LivenessVerdict
  readonly reason: LivenessReason
  readonly triage: Triage
  readonly triageReason: TriageReason
  readonly inferred?: InferredCulprit
}

export interface AddonsResolve {
  readonly listAllAddons: typeof listAllAddons
}

export interface Collect {
  readonly collectEntries: typeof collectEntries
  readonly SAVED_VARIABLES_NAME: typeof SAVED_VARIABLES_NAME
}

export interface Liveness {
  readonly classifyLiveness: typeof classifyLiveness
  readonly DEFAULT_STALE_AFTER_HOURS: typeof DEFAULT_STALE_AFTER_HOURS
  readonly extractOwningAddonCandidates: typeof extractOwningAddonCandidates
}

export interface SavedVariablesSchema {
  readonly rootSchema: typeof rootSchema
}

export interface TriageGather {
  readonly gatherTriage: typeof gatherTriage
  readonly readDeployedBuildId: typeof readDeployedBuildId
}

export interface LuaParser {
  readonly parseLuaSavedVariablesFile: typeof parseLuaSavedVariablesFile
}

export function addonsResolve(): Promise<AddonsResolve> {
  return Promise.resolve({ listAllAddons })
}

export function errorsCollect(): Promise<Collect> {
  return Promise.resolve({ collectEntries, SAVED_VARIABLES_NAME })
}

export function errorsLiveness(): Promise<Liveness> {
  return Promise.resolve({
    classifyLiveness,
    DEFAULT_STALE_AFTER_HOURS,
    extractOwningAddonCandidates,
  })
}

export function errorsSavedVariablesSchema(): Promise<SavedVariablesSchema> {
  return Promise.resolve({ rootSchema })
}

export function errorsTriageGather(): Promise<TriageGather> {
  return Promise.resolve({ gatherTriage, readDeployedBuildId })
}

export function luaParser(): Promise<LuaParser> {
  return Promise.resolve({ parseLuaSavedVariablesFile })
}
