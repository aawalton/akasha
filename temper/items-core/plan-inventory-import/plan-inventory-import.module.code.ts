export interface ExistingSnapshotRow {
  id: string
  capturedAt: string | null
}

export interface SnapshotImportPlan {
  targetSnapshotId: string | null
  snapshotsToDelete: readonly string[]
}

function compareSnapshotsNewestFirst(a: ExistingSnapshotRow, b: ExistingSnapshotRow): number {
  const at = a.capturedAt ?? ""
  const bt = b.capturedAt ?? ""
  if (at !== bt) return at < bt ? 1 : -1
  if (a.id < b.id) return 1
  if (a.id > b.id) return -1
  return 0
}

export function planSnapshotImport(existing: readonly ExistingSnapshotRow[]): SnapshotImportPlan {
  const sorted = [...existing].sort(compareSnapshotsNewestFirst)
  const target = sorted[0]
  if (target === undefined) {
    return { targetSnapshotId: null, snapshotsToDelete: [] }
  }
  return {
    targetSnapshotId: target.id,
    snapshotsToDelete: sorted.slice(1).map((r) => r.id),
  }
}

export interface ExistingChunkRow {
  id: string
  inventory: string | null
  chunkIndex: number | null
}

export interface PlannedChunkUpsert {
  index: number
  data: string
}

export interface ChunkImportPlan {
  chunksToDelete: readonly string[]
  chunksToUpsert: readonly PlannedChunkUpsert[]
}

function compareById(a: ExistingChunkRow, b: ExistingChunkRow): number {
  if (a.id < b.id) return -1
  if (a.id > b.id) return 1
  return 0
}

export function planChunkImport(
  existing: readonly ExistingChunkRow[],
  targetSnapshotId: string,
  payloads: readonly string[]
): ChunkImportPlan {
  const chunkCount = payloads.length
  const chunksToDelete: string[] = []

  const underTarget: ExistingChunkRow[] = []
  for (const row of existing) {
    if (row.inventory === targetSnapshotId) {
      underTarget.push(row)
    } else {
      chunksToDelete.push(row.id)
    }
  }

  const byIndex = new Map<number, ExistingChunkRow[]>()
  for (const row of underTarget) {
    if (row.chunkIndex === null) {
      chunksToDelete.push(row.id)
      continue
    }
    const group = byIndex.get(row.chunkIndex)
    if (group) group.push(row)
    else byIndex.set(row.chunkIndex, [row])
  }

  for (const [index, rows] of byIndex) {
    const sorted = [...rows].sort(compareById)
    if (index >= chunkCount) {
      for (const r of sorted) chunksToDelete.push(r.id)
    } else {
      for (const r of sorted.slice(1)) chunksToDelete.push(r.id)
    }
  }

  const chunksToUpsert: PlannedChunkUpsert[] = payloads.map((data, index) => ({ index, data }))
  return { chunksToDelete, chunksToUpsert }
}
