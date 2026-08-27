import { parseLuaSavedVariablesFile } from "@temper/shared-saved-variables/lua-parser"
import { codeModule } from "./code-import.ts"

const ADDONS_RESOLVE = "@temper/shared-build-deploy-addons-resolve"
const COLLECT = "@temper/shared-capture-errors-decision-core/collect"
const LIVENESS = "@temper/shared-capture-errors-decision-core/liveness"
const SAVED_VARIABLES_SCHEMA = "@temper/shared-capture-errors-decision-core/saved-variables-schema"
const TRIAGE_GATHER = "@temper/shared-capture-errors-decision-core/triage-gather"

export interface ErrorEntry {
  readonly lastSeenAt: number
  readonly count: number
  readonly character: string
  readonly world: string
  readonly apiVersion: string
  readonly message: string
  readonly traceback?: string | null
  readonly attributedAddon?: string
  readonly attributedBuildId?: string
}

export interface InferredCulprit {
  readonly addon: string
  readonly loadedBuildId?: string | null
}

export interface Ownership {
  readonly kind: string
  readonly repoRelDir?: string
  readonly latestFixMs?: number | null
}

export interface ClassifiedEntry {
  readonly entry: ErrorEntry
  readonly verdict: string
  readonly reason: unknown
  readonly triage: string
  readonly triageReason: unknown
  readonly inferred?: InferredCulprit
}

export interface AddonsResolve {
  readonly listAllAddons: (opts: { readonly repoRoot: string }) => readonly {
    readonly canonicalName: string
    readonly repoRelDir: string
  }[]
}

export interface Collect {
  readonly collectEntries: (root: unknown) => readonly ErrorEntry[]
  readonly SAVED_VARIABLES_NAME: string
}

export interface Liveness {
  readonly classifyLiveness: (input: {
    readonly lastSeenAtMs: number
    readonly frontierMs: number
    readonly staleAfterMs: number
    readonly ownership: Ownership
  }) => { readonly verdict: string; readonly reason: unknown }
  readonly DEFAULT_STALE_AFTER_HOURS: number
  readonly extractOwningAddonCandidates: (traceback: string | null | undefined) => readonly string[]
}

export interface SavedVariablesSchema {
  readonly rootSchema: { readonly parse: (value: unknown) => unknown }
}

export interface TriageGather {
  readonly gatherTriage: (
    entry: ErrorEntry,
    readDeployed: (folder: string) => Promise<string | null>
  ) => Promise<{
    readonly triage: string
    readonly reason: unknown
    readonly inferred?: InferredCulprit
  }>
  readonly readDeployedBuildId: (
    folder: string,
    cache: Map<string, string | null>
  ) => Promise<string | null>
}

export interface LuaParser {
  readonly parseLuaSavedVariablesFile: (content: string, name: string) => unknown
}

export function addonsResolve(): Promise<AddonsResolve> {
  return codeModule<AddonsResolve>(ADDONS_RESOLVE)
}

export function errorsCollect(): Promise<Collect> {
  return codeModule<Collect>(COLLECT)
}

export function errorsLiveness(): Promise<Liveness> {
  return codeModule<Liveness>(LIVENESS)
}

export function errorsSavedVariablesSchema(): Promise<SavedVariablesSchema> {
  return codeModule<SavedVariablesSchema>(SAVED_VARIABLES_SCHEMA)
}

export function errorsTriageGather(): Promise<TriageGather> {
  return codeModule<TriageGather>(TRIAGE_GATHER)
}

export function luaParser(): Promise<LuaParser> {
  return Promise.resolve({ parseLuaSavedVariablesFile })
}
