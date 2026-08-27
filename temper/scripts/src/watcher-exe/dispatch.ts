import { assertNever } from "../../../../shared/utils-narrow/src/assert-never"
import { runExportCompanionBuilds } from "../watcher/export-companion-builds"
import { runExportSettings } from "../watcher/export-settings"
import { runExportTasks } from "../watcher/export-tasks"
import { runImportCatalog } from "../watcher/import-catalog"
import { runImportCharacters } from "../watcher/import-characters"
import { runImportCompanions } from "../watcher/import-companions"
import { runImportCompletion } from "../watcher/import-completion"
import { runImportDataMining } from "../watcher/import-data-mining"
import { runImportErrors } from "../watcher/import-errors"
import { runImportInventory } from "../watcher/import-inventory"
import { runImportItemRuleVerdicts } from "../watcher/import-item-rule-verdicts"
import { runImportSales } from "../watcher/import-sales"
import { runImportTasks } from "../watcher/import-tasks"
import { buildConfig, sourcePathFor } from "./config"
import { log, logError } from "./logger"
import { reportRunOutcome } from "./report-run-outcome"
import { allSynced, isoFromMtimeMs, type SyncOperation } from "./run-outcome"
import {
  type OperationTarget,
  observe,
  observeChain,
  observeSideFileExport,
  SKIPPED_AFTER_FAILURE,
  skippedOperation,
  statMtimeMs,
} from "./run-outcome-observe"
import { getSupabaseClient } from "./supabase-client"

export type FileType =
  | "catalog"
  | "characters"
  | "companions"
  | "data-mining"
  | "errors"
  | "inventory"
  | "sales"

export interface DispatchResult {
  ok: boolean
  operations: readonly SyncOperation[]
  writeBack: string | null
  inventoryConfigSideFileHash: string | null
  companionsConfigSideFileHash: string | null
  charactersConfigSideFileHash: string | null
  error?: string
}

export interface DispatchOptions {
  readonly inventoryConfigPath?: string
  readonly companionsConfigPath?: string
  readonly charactersConfigPath?: string
  readonly sourcePath?: string
  readonly sourceMtimeMs?: number
}

export async function dispatch(
  fileType: FileType,
  content: string,
  wtToken: string,
  serverUrl: string,
  options: DispatchOptions = {}
): Promise<DispatchResult> {
  try {
    const result = await dispatchByType(fileType, content, wtToken, serverUrl, options)
    return await settle(result)
  } catch (err) {
    return { ...emptyResult(), ok: false, error: extractErrorMessage(err) }
  }
}

async function settle(result: DispatchByTypeResult): Promise<DispatchResult> {
  if (result.operations.length > 0) {
    await reportRunOutcome(result.operations)
  }
  return { ...result, ok: allSynced(result.operations) }
}

function emptyResult(): DispatchResult {
  return {
    ok: true,
    operations: [],
    writeBack: null,
    inventoryConfigSideFileHash: null,
    companionsConfigSideFileHash: null,
    charactersConfigSideFileHash: null,
  }
}

function extractErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message
  return String(err)
}

interface DispatchByTypeResult {
  operations: readonly SyncOperation[]
  writeBack: string | null
  inventoryConfigSideFileHash: string | null
  companionsConfigSideFileHash: string | null
  charactersConfigSideFileHash: string | null
}

function noSideFile(
  writeBack: string | null,
  operations: readonly SyncOperation[]
): DispatchByTypeResult {
  return {
    operations,
    writeBack,
    inventoryConfigSideFileHash: null,
    companionsConfigSideFileHash: null,
    charactersConfigSideFileHash: null,
  }
}

function importTargets(
  fileType: FileType,
  options: DispatchOptions
): (name: string) => OperationTarget {
  const path = options.sourcePath ?? sourcePathFor(fileType, buildConfig())
  const mtimeMs = options.sourceMtimeMs ?? statMtimeMs(path)
  const fileModifiedAt = mtimeMs === null ? null : isoFromMtimeMs(mtimeMs)
  return (name) => ({
    kind: "import",
    name,
    path,
    ...(fileModifiedAt === null ? {} : { fileModifiedAt }),
  })
}

function optional(operation: SyncOperation | null): readonly SyncOperation[] {
  return operation === null ? [] : [operation]
}

async function dispatchByType(
  fileType: FileType,
  content: string,
  wtToken: string,
  serverUrl: string,
  options: DispatchOptions
): Promise<DispatchByTypeResult> {
  const imported = importTargets(fileType, options)
  switch (fileType) {
    case "catalog": {
      const { operation } = await observe(imported("catalog"), () => runImportCatalog(content))
      return noSideFile(null, [operation])
    }
    case "characters": {
      const supabase = getSupabaseClient()
      const imports = await observeChain([
        { target: imported("characters"), run: () => runImportCharacters(content, supabase) },
        { target: imported("completion"), run: () => runImportCompletion(content, supabase) },
        { target: imported("tasks"), run: () => runImportTasks(content, supabase) },
      ])
      const exported = await exportCharacters(content, supabase, options, imports)
      return {
        operations: [...imports, ...exported.operations],
        writeBack: null,
        inventoryConfigSideFileHash: null,
        companionsConfigSideFileHash: null,
        charactersConfigSideFileHash: exported.hash,
      }
    }
    case "companions": {
      const supabase = getSupabaseClient()
      const [companionImport, companionExport] = await Promise.all([
        observe(imported("companions"), () => runImportCompanions(content, supabase)),
        observeSideFileExport(
          "companionsConfig",
          options.companionsConfigPath,
          (companionsConfigPath) =>
            runExportCompanionBuilds(content, supabase, { companionsConfigPath })
        ),
      ])
      const result = companionExport.value
      return {
        operations: [companionImport.operation, ...optional(companionExport.operation)],
        writeBack: result?.modified === true ? result.content : null,
        inventoryConfigSideFileHash: null,
        companionsConfigSideFileHash: result?.companionsConfigSideFileHash ?? null,
        charactersConfigSideFileHash: null,
      }
    }
    case "inventory": {
      const supabase = getSupabaseClient()
      const verdicts = await observe(imported("itemRuleVerdicts"), () =>
        runImportItemRuleVerdicts(content, supabase, { log, logError })
      )
      const inventoryImport = await observe(imported("inventory"), () =>
        runImportInventory(content, supabase)
      )
      const settingsExport = await observeSideFileExport(
        "inventoryConfig",
        options.inventoryConfigPath,
        (inventoryConfigPath) => runExportSettings(content, supabase, { inventoryConfigPath })
      )
      const result = settingsExport.value
      return {
        operations: [
          verdicts.operation,
          inventoryImport.operation,
          ...optional(settingsExport.operation),
        ],
        writeBack: result?.modified === true ? result.content : null,
        inventoryConfigSideFileHash: result?.inventoryConfigSideFileHash ?? null,
        companionsConfigSideFileHash: null,
        charactersConfigSideFileHash: null,
      }
    }
    case "data-mining": {
      const { operation, value } = await observe(imported("dataMining"), () =>
        runImportDataMining(content, serverUrl, wtToken)
      )
      return noSideFile(value?.modified === true ? value.content : null, [operation])
    }
    case "errors": {
      const { operation } = await observe(imported("errors"), () => runImportErrors(content, log))
      return noSideFile(null, [operation])
    }
    case "sales": {
      const supabase = getSupabaseClient()
      const { operation } = await observe(imported("sales"), () =>
        runImportSales(content, supabase)
      )
      return noSideFile(null, [operation])
    }
    default:
      return assertNever(fileType)
  }
}

async function exportCharacters(
  content: string,
  supabase: ReturnType<typeof getSupabaseClient>,
  options: DispatchOptions,
  imports: readonly SyncOperation[]
): Promise<{ operations: readonly SyncOperation[]; hash: string | null }> {
  const configPath = options.charactersConfigPath
  if (!allSynced(imports)) {
    if (configPath === undefined) return { operations: [], hash: null }
    const target: OperationTarget = { kind: "export", name: "charactersConfig", path: configPath }
    return { operations: [skippedOperation(target, SKIPPED_AFTER_FAILURE)], hash: null }
  }
  const { operation, value } = await observeSideFileExport(
    "charactersConfig",
    configPath,
    (charactersConfigPath) => runExportTasks(content, supabase, { charactersConfigPath })
  )
  return { operations: optional(operation), hash: value?.charactersConfigSideFileHash ?? null }
}
