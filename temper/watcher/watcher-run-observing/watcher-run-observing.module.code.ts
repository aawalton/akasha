import { existsSync, statSync } from "node:fs"
import { dirname } from "node:path"
import type { FileType } from "../watcher-file-type/watcher-file-type.module.code.ts"
import type {
  SyncOperation,
  SyncOperationKind,
  SyncOperationState,
} from "../watcher-run-outcome/watcher-run-outcome.module.code.ts"

export const TARGET_OPERATIONS = {
  catalog: { imports: ["catalog"] },
  characters: { imports: ["characters", "completion", "tasks"], sideFile: "charactersConfig" },
  companions: { imports: ["companions"], sideFile: "companionsConfig" },
  "data-mining": { imports: ["dataMining"] },
  errors: { imports: ["errors"] },
  inventory: { imports: ["itemRuleVerdicts", "inventory"], sideFile: "inventoryConfig" },
  sales: { imports: ["sales"] },
} as const satisfies Record<FileType, { imports: readonly string[]; sideFile?: string }>

export const SKIPPED_AFTER_FAILURE = "not attempted — an earlier operation in this chain failed"

export const ADDON_DIRECTORY_ABSENT = "addon directory absent — the addon is not installed"

export interface OperationTarget {
  readonly kind: SyncOperationKind
  readonly name: string
  readonly path: string
  readonly fileModifiedAt?: string
}

export interface Observed<T> {
  readonly operation: SyncOperation
  readonly value: T | null
}

function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err)
}

export function statMtimeMs(path: string): number | null {
  try {
    return statSync(path).mtimeMs
  } catch {
    return null
  }
}

export async function observe<T>(
  target: OperationTarget,
  run: () => Promise<T>
): Promise<Observed<T>> {
  const ranAt = new Date().toISOString()
  try {
    const value = await run()
    return { operation: { ...target, state: "synced", ranAt }, value }
  } catch (err) {
    return {
      operation: { ...target, state: "upload_failed", ranAt, detail: errorMessage(err) },
      value: null,
    }
  }
}

export function skippedOperation(target: OperationTarget, detail: string): SyncOperation {
  return { ...target, state: "skipped", ranAt: new Date().toISOString(), detail }
}

export interface ChainStep {
  readonly target: OperationTarget
  readonly run: () => Promise<unknown>
}

export async function observeChain(steps: readonly ChainStep[]): Promise<SyncOperation[]> {
  const operations: SyncOperation[] = []
  let halted = false
  for (const step of steps) {
    if (halted) {
      operations.push(skippedOperation(step.target, SKIPPED_AFTER_FAILURE))
      continue
    }
    const { operation } = await observe(step.target, step.run)
    operations.push(operation)
    if (operation.state !== "synced") halted = true
  }
  return operations
}

export async function observeSideFileExport<T>(
  name: string,
  configPath: string | undefined,
  run: (configPath: string | undefined) => Promise<T>,
  addonFolderPresent: (path: string) => boolean = (path) => existsSync(dirname(path))
): Promise<{ operation: SyncOperation | null; value: T | null }> {
  if (configPath === undefined) {
    const value = await run(undefined).catch(() => null)
    return { operation: null, value }
  }

  const installed = addonFolderPresent(configPath)
  const target: OperationTarget = { kind: "export", name, path: configPath }
  const { operation, value } = await observe(target, () => run(installed ? configPath : undefined))

  if (installed || operation.state !== "synced") return { operation, value }
  return { operation: { ...operation, state: "skipped", detail: ADDON_DIRECTORY_ABSENT }, value }
}

export function preDispatchOperations(args: {
  readonly fileType: FileType
  readonly sourcePath: string
  readonly configPath?: string
  readonly state: SyncOperationState
  readonly detail?: string
}): readonly SyncOperation[] {
  const target = TARGET_OPERATIONS[args.fileType]
  const imports: readonly string[] = target.imports
  const sideFile: string | undefined = "sideFile" in target ? target.sideFile : undefined
  const ranAt = new Date().toISOString()

  const reads: SyncOperation[] = imports.map((name) => ({
    kind: "import",
    name,
    path: args.sourcePath,
    state: args.state,
    ranAt,
    ...(args.detail === undefined ? {} : { detail: args.detail }),
  }))

  if (sideFile === undefined || args.configPath === undefined) return reads
  return [
    ...reads,
    skippedOperation(
      { kind: "export", name: sideFile, path: args.configPath },
      SKIPPED_AFTER_FAILURE
    ),
  ]
}
