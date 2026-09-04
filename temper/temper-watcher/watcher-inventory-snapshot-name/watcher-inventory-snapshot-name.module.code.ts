export function inventorySnapshotName(dataTimestamp: number): string {
  return new Date(dataTimestamp).toISOString().slice(0, 19).replace(/[:T]/g, "-")
}

export function inventoryChunkName(snapshotName: string, chunkIndex: number): string {
  return `${snapshotName}-${chunkIndex}`
}
