import { buildConfig, sourcePathFor } from "../watcher-config/watcher-config.module.code.ts"
import { runExportCompanionBuilds } from "../watcher-export-companion-builds/watcher-export-companion-builds.module.code.ts"
import { runExportSettings } from "../watcher-export-settings/watcher-export-settings.module.code.ts"
import { runExportTasks } from "../watcher-export-tasks/watcher-export-tasks.module.code.ts"
import type { FileType } from "../watcher-file-type/watcher-file-type.module.code.ts"
import { runImportCatalog } from "../watcher-import-catalog/watcher-import-catalog.module.code.ts"
import { runImportCharacters } from "../watcher-import-characters/watcher-import-characters.module.code.ts"
import { runImportCompanions } from "../watcher-import-companions/watcher-import-companions.module.code.ts"
import { runImportCompletion } from "../watcher-import-completion/watcher-import-completion.module.code.ts"
import { runImportDataMining } from "../watcher-import-data-mining/watcher-import-data-mining.module.code.ts"
import { runImportErrors } from "../watcher-import-errors/watcher-import-errors.module.code.ts"
import { runImportInventory } from "../watcher-import-inventory/watcher-import-inventory.module.code.ts"
import {
  runImportItemRuleVerdicts,
  supabaseUserSource,
} from "../watcher-import-item-rule-verdicts/watcher-import-item-rule-verdicts.module.code.ts"
import { runImportSales } from "../watcher-import-sales/watcher-import-sales.module.code.ts"
import { runImportTasks } from "../watcher-import-tasks/watcher-import-tasks.module.code.ts"
import {
  type OperationTarget,
  observe,
  observeChain,
  observeSideFileExport,
  SKIPPED_AFTER_FAILURE,
  skippedOperation,
  statMtimeMs,
  TARGET_OPERATIONS,
} from "../watcher-run-observing/watcher-run-observing.module.code.ts"
import {
  allSynced,
  isoFromMtimeMs,
  type SyncOperation,
} from "../watcher-run-outcome/watcher-run-outcome.module.code.ts"
import { reportRunOutcome } from "../watcher-run-reporting/watcher-run-reporting.module.code.ts"
import {
  type SignedInReader,
  signedInUserId,
} from "../watcher-signed-in-user/watcher-signed-in-user.module.code.ts"

export const COMPLETION_TO_DO = "import this completion"

const [CATALOG] = TARGET_OPERATIONS.catalog.imports
const [CHARACTERS, COMPLETION, TASKS] = TARGET_OPERATIONS.characters.imports
const [COMPANIONS] = TARGET_OPERATIONS.companions.imports
const [DATA_MINING] = TARGET_OPERATIONS["data-mining"].imports
const [ERRORS] = TARGET_OPERATIONS.errors.imports
const [ITEM_RULE_VERDICTS, INVENTORY] = TARGET_OPERATIONS.inventory.imports
const [SALES] = TARGET_OPERATIONS.sales.imports
const CHARACTERS_CONFIG = TARGET_OPERATIONS.characters.sideFile
const COMPANIONS_CONFIG = TARGET_OPERATIONS.companions.sideFile
const INVENTORY_CONFIG = TARGET_OPERATIONS.inventory.sideFile

export interface DispatchRunners {
  readonly importCatalog: typeof runImportCatalog
  readonly importCharacters: typeof runImportCharacters
  readonly importCompanions: typeof runImportCompanions
  readonly importCompletion: typeof runImportCompletion
  readonly importDataMining: typeof runImportDataMining
  readonly importErrors: typeof runImportErrors
  readonly importInventory: typeof runImportInventory
  readonly importItemRuleVerdicts: typeof runImportItemRuleVerdicts
  readonly importSales: typeof runImportSales
  readonly importTasks: typeof runImportTasks
  readonly exportCompanionBuilds: typeof runExportCompanionBuilds
  readonly exportSettings: typeof runExportSettings
  readonly exportTasks: typeof runExportTasks
}

export const WATCHER_RUNNERS: DispatchRunners = {
  importCatalog: runImportCatalog,
  importCharacters: runImportCharacters,
  importCompanions: runImportCompanions,
  importCompletion: runImportCompletion,
  importDataMining: runImportDataMining,
  importErrors: runImportErrors,
  importInventory: runImportInventory,
  importItemRuleVerdicts: runImportItemRuleVerdicts,
  importSales: runImportSales,
  importTasks: runImportTasks,
  exportCompanionBuilds: runExportCompanionBuilds,
  exportSettings: runExportSettings,
  exportTasks: runExportTasks,
}

export type RunReport = (operations: readonly SyncOperation[]) => Promise<void>

export interface DispatchOptions {
  readonly reader: SignedInReader
  readonly runners?: DispatchRunners
  readonly report?: RunReport
  readonly inventoryConfigPath?: string
  readonly companionsConfigPath?: string
  readonly charactersConfigPath?: string
  readonly sourcePath?: string
  readonly sourceMtimeMs?: number
}

export interface DispatchResult {
  readonly ok: boolean
  readonly operations: readonly SyncOperation[]
  readonly writeBack: string | null
  readonly inventoryConfigSideFileHash: string | null
  readonly companionsConfigSideFileHash: string | null
  readonly charactersConfigSideFileHash: string | null
  readonly error?: string
}

const NOTHING_WRITTEN = {
  writeBack: null,
  inventoryConfigSideFileHash: null,
  companionsConfigSideFileHash: null,
  charactersConfigSideFileHash: null,
} as const

type Handled = Omit<DispatchResult, "ok" | "error">

interface Job {
  readonly content: string
  readonly wtToken: string
  readonly serverUrl: string
  readonly reader: SignedInReader
  readonly runners: DispatchRunners
  readonly options: DispatchOptions
  readonly imported: (name: string) => OperationTarget
}

type FileHandler = (job: Job) => Promise<Handled>

function noSideFile(writeBack: string | null, operations: readonly SyncOperation[]): Handled {
  return { ...NOTHING_WRITTEN, operations, writeBack }
}

function optional(operation: SyncOperation | null): readonly SyncOperation[] {
  return operation === null ? [] : [operation]
}

async function handleCatalog(job: Job): Promise<Handled> {
  const { operation } = await observe(job.imported(CATALOG), () =>
    job.runners.importCatalog(job.content)
  )
  return noSideFile(null, [operation])
}

async function handleCharacters(job: Job): Promise<Handled> {
  const { content, reader, runners } = job
  const imports = await observeChain([
    { target: job.imported(CHARACTERS), run: () => runners.importCharacters(content, reader) },
    {
      target: job.imported(COMPLETION),
      run: () =>
        runners.importCompletion(content, {
          signedInUserId: () => signedInUserId(reader, COMPLETION_TO_DO),
        }),
    },
    { target: job.imported(TASKS), run: () => runners.importTasks(content, reader) },
  ])
  const exported = await exportCharacters(job, imports)
  return {
    ...NOTHING_WRITTEN,
    operations: [...imports, ...exported.operations],
    charactersConfigSideFileHash: exported.hash,
  }
}

async function exportCharacters(
  job: Job,
  imports: readonly SyncOperation[]
): Promise<{ operations: readonly SyncOperation[]; hash: string | null }> {
  const configPath = job.options.charactersConfigPath
  if (!allSynced(imports)) {
    if (configPath === undefined) return { operations: [], hash: null }
    const target: OperationTarget = { kind: "export", name: CHARACTERS_CONFIG, path: configPath }
    return { operations: [skippedOperation(target, SKIPPED_AFTER_FAILURE)], hash: null }
  }
  const { operation, value } = await observeSideFileExport(
    CHARACTERS_CONFIG,
    configPath,
    (charactersConfigPath) =>
      job.runners.exportTasks(job.content, job.reader, { charactersConfigPath })
  )
  return { operations: optional(operation), hash: value?.charactersConfigSideFileHash ?? null }
}

async function handleCompanions(job: Job): Promise<Handled> {
  const { content, reader, runners } = job
  const [imported, exported] = await Promise.all([
    observe(job.imported(COMPANIONS), () => runners.importCompanions(content, reader)),
    observeSideFileExport(
      COMPANIONS_CONFIG,
      job.options.companionsConfigPath,
      (companionsConfigPath) =>
        runners.exportCompanionBuilds(content, reader, { companionsConfigPath })
    ),
  ])
  const built = exported.value
  return {
    ...NOTHING_WRITTEN,
    operations: [imported.operation, ...optional(exported.operation)],
    writeBack: built?.modified === true ? built.content : null,
    companionsConfigSideFileHash: built?.companionsConfigSideFileHash ?? null,
  }
}

async function handleInventory(job: Job): Promise<Handled> {
  const { content, reader, runners } = job
  const verdicts = await observe(job.imported(ITEM_RULE_VERDICTS), () =>
    runners.importItemRuleVerdicts(content, supabaseUserSource(reader))
  )
  const imported = await observe(job.imported(INVENTORY), () =>
    runners.importInventory(content, reader)
  )
  const exported = await observeSideFileExport(
    INVENTORY_CONFIG,
    job.options.inventoryConfigPath,
    (inventoryConfigPath) => runners.exportSettings(content, reader, { inventoryConfigPath })
  )
  const written = exported.value
  return {
    ...NOTHING_WRITTEN,
    operations: [verdicts.operation, imported.operation, ...optional(exported.operation)],
    writeBack: written?.modified === true ? written.content : null,
    inventoryConfigSideFileHash: written?.inventoryConfigSideFileHash ?? null,
  }
}

async function handleDataMining(job: Job): Promise<Handled> {
  const { operation, value } = await observe(job.imported(DATA_MINING), () =>
    job.runners.importDataMining(job.content, job.serverUrl, job.wtToken)
  )
  return noSideFile(value?.modified === true ? value.content : null, [operation])
}

async function handleErrors(job: Job): Promise<Handled> {
  const { operation } = await observe(job.imported(ERRORS), () =>
    job.runners.importErrors(job.content)
  )
  return noSideFile(null, [operation])
}

async function handleSales(job: Job): Promise<Handled> {
  const { operation } = await observe(job.imported(SALES), () =>
    job.runners.importSales(job.content, job.reader)
  )
  return noSideFile(null, [operation])
}

const HANDLERS = {
  catalog: handleCatalog,
  characters: handleCharacters,
  companions: handleCompanions,
  "data-mining": handleDataMining,
  errors: handleErrors,
  inventory: handleInventory,
  sales: handleSales,
} as const satisfies Record<FileType, FileHandler>

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

function accountIdFrom(reader: SignedInReader): () => Promise<string | null> {
  return async () => (await reader.auth.getUser()).data.user?.id ?? null
}

function reportFor(options: DispatchOptions): RunReport {
  const stated = options.report
  if (stated !== undefined) return stated
  const accountId = accountIdFrom(options.reader)
  return (operations) => reportRunOutcome(operations, { accountId })
}

function emptyResult(): DispatchResult {
  return { ...NOTHING_WRITTEN, ok: true, operations: [] }
}

function extractErrorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err)
}

async function settle(handled: Handled, options: DispatchOptions): Promise<DispatchResult> {
  if (handled.operations.length > 0) await reportFor(options)(handled.operations)
  return { ...handled, ok: allSynced(handled.operations) }
}

export async function dispatch(
  fileType: FileType,
  content: string,
  wtToken: string,
  serverUrl: string,
  options: DispatchOptions
): Promise<DispatchResult> {
  try {
    const handled = await HANDLERS[fileType]({
      content,
      wtToken,
      serverUrl,
      reader: options.reader,
      runners: options.runners ?? WATCHER_RUNNERS,
      options,
      imported: importTargets(fileType, options),
    })
    return await settle(handled, options)
  } catch (err) {
    return { ...emptyResult(), ok: false, error: extractErrorMessage(err) }
  }
}
