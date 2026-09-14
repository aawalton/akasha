const WHOLE_SECONDS = 19

export function inventorySnapshotName(capturedAt: string): string {
  return capturedAt.slice(0, WHOLE_SECONDS).replace(/[:T]/g, "-")
}
