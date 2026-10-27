import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import {
  buildConfig,
  sourcePathFor,
} from "akasha/temper/watcher/modules/watcher-config/watcher-config.module.code.ts"
import {
  type DispatchRunners,
  WATCHER_RUNNERS,
} from "akasha/temper/watcher/modules/watcher-dispatch-runners/watcher-dispatch-runners.module.code.ts"
import type { FileType } from "akasha/temper/watcher/modules/watcher-file-type/watcher-file-type.module.code.ts"
import { supabaseUserSource } from "akasha/temper/watcher/modules/watcher-import-item-rule-verdicts/watcher-import-item-rule-verdicts.module.code.ts"
import {
  type OperationTarget,
  observe,
  observeChain,
  observeSideFileExport,
  SKIPPED_AFTER_FAILURE,
  skippedOperation,
  statMtimeMs,
  TARGET_OPERATIONS,
} from "akasha/temper/watcher/modules/watcher-run-observing/watcher-run-observing.module.code.ts"
import {
  allSynced,
  isoFromMtimeMs,
  type SyncOperation,
} from "akasha/temper/watcher/modules/watcher-run-outcome/watcher-run-outcome.module.code.ts"
import { reportRunOutcome } from "akasha/temper/watcher/modules/watcher-run-reporting/watcher-run-reporting.module.code.ts"
import {
  type SignedInReader,
  signedInUserId,
} from "akasha/temper/watcher/modules/watcher-signed-in-user/watcher-signed-in-user.module.code.ts"

const COMPLETION_TO_DO = "import this completion"

export const COMPLETION_NOT_LANDED = "the completion import did not land this run"

const [CATALOG] = TARGET_OPERATIONS.catalog.imports
const [CHARACTERS, COMPLETION, TASKS] = TARGET_OPERATIONS.characters.imports
const [FIGHTS] = TARGET_OPERATIONS.combat.imports
const [COMPANIONS] = TARGET_OPERATIONS.companions.imports
const [DATA_MINING] = TARGET_OPERATIONS["data-mining"].imports
const [ERRORS] = TARGET_OPERATIONS.errors.imports
const [ITEM_RULE_VERDICTS, INVENTORY] = TARGET_OPERATIONS.inventory.imports
const [SALES] = TARGET_OPERATIONS.sales.imports
const CHARACTERS_CONFIG = TARGET_OPERATIONS.characters.sideFile
const COMPANIONS_CONFIG = TARGET_OPERATIONS.companions.sideFile
const INVENTORY_CONFIG = TARGET_OPERATIONS.inventory.sideFile
const CATALOG_CONFIG = TARGET_OPERATIONS["data-mining"].sideFile
const CATALOG_LANDED = TARGET_OPERATIONS.catalog.sideFile
const CORE_CONFIG = TARGET_OPERATIONS.errors.sideFile

export type RunReport = (operations: readonly SyncOperation[]) => Promise<void>

export interface DispatchOptions {
  readonly reader: SignedInReader
  readonly runners?: DispatchRunners
  readonly report?: RunReport
  readonly inventoryConfigPath?: string
  readonly companionsConfigPath?: string
  readonly charactersConfigPath?: string
  readonly catalogConfigPath?: string
  readonly catalogLandedPath?: string
  readonly coreConfigPath?: string
  readonly sourcePath?: string
  readonly sourceMtimeMs?: number
}

interface DispatchResult {
  readonly ok: boolean
  readonly operations: readonly SyncOperation[]
  readonly writeBack: string | null
  readonly inventoryConfigSideFileHash: string | null
  readonly companionsConfigSideFileHash: string | null
  readonly charactersConfigSideFileHash: string | null
  readonly catalogConfigSideFileHash: string | null
  readonly catalogLandedSideFileHash: string | null
  readonly coreConfigSideFileHash: string | null
  readonly error?: string
}

const NOTHING_WRITTEN = {
  writeBack: null,
  inventoryConfigSideFileHash: null,
  companionsConfigSideFileHash: null,
  charactersConfigSideFileHash: null,
  catalogConfigSideFileHash: null,
  catalogLandedSideFileHash: null,
  coreConfigSideFileHash: null,
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
  const { operation, value } = await observe(job.imported(CATALOG), () =>
    job.runners.importCatalog(job.content)
  )
  const landed = value?.landed ?? {}
  if (Object.keys(landed).length === 0) return noSideFile(null, [operation])
  const exported = await observeSideFileExport(
    CATALOG_LANDED,
    job.options.catalogLandedPath,
    (catalogLandedPath) => job.runners.exportLandedCatalogs(catalogLandedPath, landed)
  )
  return {
    ...NOTHING_WRITTEN,
    operations: [operation, ...optional(exported.operation)],
    catalogLandedSideFileHash: exported.value ?? null,
  }
}

function progressLeft(): Promise<number> {
  return Promise.reject(new Error(COMPLETION_NOT_LANDED))
}

async function tasksAfter(job: Job, chained: readonly SyncOperation[]): Promise<SyncOperation> {
  const target = job.imported(TASKS)
  if (chained[0]?.state !== "synced") return skippedOperation(target, SKIPPED_AFTER_FAILURE)
  const options = allSynced(chained) ? {} : { refreshProgress: progressLeft }
  const { operation } = await observe(target, () =>
    job.runners.importTasks(job.content, job.reader, options)
  )
  return operation
}

async function handleCharacters(job: Job): Promise<Handled> {
  const { content, reader, runners } = job
  const chained = await observeChain([
    { target: job.imported(CHARACTERS), run: () => runners.importCharacters(content, reader) },
    {
      target: job.imported(COMPLETION),
      run: () =>
        runners.importCompletion(content, {
          signedInUserId: () => signedInUserId(reader, COMPLETION_TO_DO),
        }),
    },
  ])
  const tasks = await tasksAfter(job, chained)
  const exported = await exportCharacters(job, [...chained.slice(0, 1), tasks])
  return {
    ...NOTHING_WRITTEN,
    operations: [...chained, tasks, ...exported.operations],
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
  const writeBack = value?.modified === true ? value.content : null
  const uploaded = value?.minedItemsUploaded ?? null
  if (uploaded === null) return noSideFile(writeBack, [operation])
  const exported = await observeSideFileExport(
    CATALOG_CONFIG,
    job.options.catalogConfigPath,
    (catalogConfigPath) => job.runners.exportMinedUploaded(catalogConfigPath, uploaded)
  )
  return {
    ...NOTHING_WRITTEN,
    operations: [operation, ...optional(exported.operation)],
    writeBack,
    catalogConfigSideFileHash: exported.value ?? null,
  }
}

async function handleErrors(job: Job): Promise<Handled> {
  const { operation } = await observe(job.imported(ERRORS), () =>
    job.runners.importErrors(job.content)
  )
  const exported = await observeSideFileExport(
    CORE_CONFIG,
    job.options.coreConfigPath,
    (coreConfigPath) => job.runners.exportHudLayout(coreConfigPath)
  )
  return {
    ...NOTHING_WRITTEN,
    operations: [operation, ...optional(exported.operation)],
    coreConfigSideFileHash: exported.value ?? null,
  }
}

async function handleCombat(job: Job): Promise<Handled> {
  const { operation } = await observe(job.imported(FIGHTS), () =>
    job.runners.importFights(job.content)
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
  combat: handleCombat,
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
    return { ...emptyResult(), ok: false, error: saidBy(err) }
  }
}
