export type SyncOperationKind = "import" | "export"

export type SyncOperationState =
  | "synced"
  | "file_not_found"
  | "parse_failed"
  | "upload_failed"
  | "skipped"

export interface SyncOperation {
  readonly kind: SyncOperationKind
  readonly name: string
  readonly path: string
  readonly state: SyncOperationState
  readonly ranAt: string
  readonly detail?: string
  readonly fileModifiedAt?: string
}

export interface StoredOperation {
  readonly name: string
}

export interface RunOutcome {
  readonly watcherVersion: string
  readonly reportedAt: string
  readonly operations: readonly StoredOperation[]
}

export function mergeOperations(
  existing: readonly StoredOperation[],
  incoming: readonly SyncOperation[]
): readonly StoredOperation[] {
  const replaced = new Set(incoming.map((o) => o.name))
  const kept = existing.filter((o) => !replaced.has(o.name))
  return [...kept, ...incoming].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
}

export function isoFromMtimeMs(mtimeMs: number): string | null {
  if (!Number.isFinite(mtimeMs) || mtimeMs <= 0) return null
  return new Date(mtimeMs).toISOString()
}

export function allSynced(operations: readonly SyncOperation[]): boolean {
  return operations.every((o) => o.state === "synced")
}

export function describeOperations(operations: readonly SyncOperation[]): string {
  if (operations.length === 0) return "no operations ran"
  return operations
    .map((o) =>
      o.detail === undefined ? `${o.name} ${o.state}` : `${o.name} ${o.state} (${o.detail})`
    )
    .join(", ")
}
