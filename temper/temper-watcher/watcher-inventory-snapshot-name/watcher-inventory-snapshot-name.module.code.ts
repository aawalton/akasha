const WHOLE_SECONDS = 19

export function inventorySnapshotName(capturedAt: string): string {
  return capturedAt.slice(0, WHOLE_SECONDS).replace(/[:T]/g, "-")
}

export function inventoryChunkName(snapshotName: string, chunkIndex: number): string {
  return `${snapshotName}-${chunkIndex}`
}
