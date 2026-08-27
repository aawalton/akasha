import { describe, expect, it } from "bun:test"
import {
  type ExistingChunkRow,
  type ExistingSnapshotRow,
  planChunkImport,
  planSnapshotImport,
} from "./plan-inventory-import"

describe("planSnapshotImport", () => {
  it("returns a null target and no deletions when no snapshot exists", () => {
    const plan = planSnapshotImport([])
    expect(plan.targetSnapshotId).toBeNull()
    expect(plan.snapshotsToSoftDelete).toEqual([])
  })

  it("reuses the sole existing snapshot with no deletions", () => {
    const existing: ExistingSnapshotRow[] = [{ id: "snap-a", dataTimestamp: 1000 }]
    const plan = planSnapshotImport(existing)
    expect(plan.targetSnapshotId).toBe("snap-a")
    expect(plan.snapshotsToSoftDelete).toEqual([])
  })

  it("keeps the newest (by dataTimestamp) and soft-deletes the rest", () => {
    const existing: ExistingSnapshotRow[] = [
      { id: "snap-old", dataTimestamp: 1000 },
      { id: "snap-new", dataTimestamp: 3000 },
      { id: "snap-mid", dataTimestamp: 2000 },
    ]
    const plan = planSnapshotImport(existing)
    expect(plan.targetSnapshotId).toBe("snap-new")
    expect([...plan.snapshotsToSoftDelete].sort()).toEqual(["snap-mid", "snap-old"])
  })

  it("breaks a dataTimestamp tie on the larger id (newer UUIDv7)", () => {
    const existing: ExistingSnapshotRow[] = [
      { id: "snap-aaa", dataTimestamp: 2000 },
      { id: "snap-zzz", dataTimestamp: 2000 },
    ]
    const plan = planSnapshotImport(existing)
    expect(plan.targetSnapshotId).toBe("snap-zzz")
    expect(plan.snapshotsToSoftDelete).toEqual(["snap-aaa"])
  })

  it("treats a null dataTimestamp as oldest", () => {
    const existing: ExistingSnapshotRow[] = [
      { id: "snap-null", dataTimestamp: null },
      { id: "snap-real", dataTimestamp: 1 },
    ]
    const plan = planSnapshotImport(existing)
    expect(plan.targetSnapshotId).toBe("snap-real")
    expect(plan.snapshotsToSoftDelete).toEqual(["snap-null"])
  })
})

describe("planChunkImport", () => {
  it("plans plain creates when no chunks exist yet", () => {
    const plan = planChunkImport([], "snap-a", ["chunk0", "chunk1"])
    expect(plan.chunksToSoftDelete).toEqual([])
    expect(plan.chunksToUpsert).toEqual([
      { index: 0, data: "chunk0" },
      { index: 1, data: "chunk1" },
    ])
  })

  it("soft-deletes a duplicate chunkIndex:0, keeping the lowest-id row", () => {
    const existing: ExistingChunkRow[] = [
      { id: "chunk-aaa", inventory: "snap-a", chunkIndex: 0 },
      { id: "chunk-bbb", inventory: "snap-a", chunkIndex: 0 },
    ]
    const plan = planChunkImport(existing, "snap-a", ["payload0"])
    expect(plan.chunksToSoftDelete).toEqual(["chunk-bbb"])
    expect(plan.chunksToUpsert).toEqual([{ index: 0, data: "payload0" }])
  })

  it("soft-deletes shrink orphans (index >= new chunk count)", () => {
    const existing: ExistingChunkRow[] = [
      { id: "chunk-0", inventory: "snap-a", chunkIndex: 0 },
      { id: "chunk-1", inventory: "snap-a", chunkIndex: 1 },
      { id: "chunk-2", inventory: "snap-a", chunkIndex: 2 },
    ]
    const plan = planChunkImport(existing, "snap-a", ["p0", "p1"])
    expect(plan.chunksToSoftDelete).toEqual(["chunk-2"])
    expect(plan.chunksToUpsert).toEqual([
      { index: 0, data: "p0" },
      { index: 1, data: "p1" },
    ])
  })

  it("soft-deletes chunks belonging to a non-target snapshot", () => {
    const existing: ExistingChunkRow[] = [
      { id: "chunk-keep", inventory: "snap-target", chunkIndex: 0 },
      { id: "chunk-orphan-a", inventory: "snap-old", chunkIndex: 0 },
      { id: "chunk-orphan-b", inventory: "snap-old", chunkIndex: 1 },
    ]
    const plan = planChunkImport(existing, "snap-target", ["p0"])
    expect([...plan.chunksToSoftDelete].sort()).toEqual(["chunk-orphan-a", "chunk-orphan-b"])
    expect(plan.chunksToUpsert).toEqual([{ index: 0, data: "p0" }])
  })

  it("soft-deletes malformed rows with a null chunkIndex", () => {
    const existing: ExistingChunkRow[] = [
      { id: "chunk-good", inventory: "snap-a", chunkIndex: 0 },
      { id: "chunk-null", inventory: "snap-a", chunkIndex: null },
    ]
    const plan = planChunkImport(existing, "snap-a", ["p0"])
    expect(plan.chunksToSoftDelete).toEqual(["chunk-null"])
  })

  it("handles the combined case: duplicate + shrink orphan + foreign snapshot", () => {
    const existing: ExistingChunkRow[] = [
      { id: "c-0a", inventory: "snap-a", chunkIndex: 0 },
      { id: "c-0b", inventory: "snap-a", chunkIndex: 0 },
      { id: "c-1", inventory: "snap-a", chunkIndex: 1 },
      { id: "c-2", inventory: "snap-a", chunkIndex: 2 },
      { id: "c-foreign", inventory: "snap-b", chunkIndex: 0 },
    ]
    const plan = planChunkImport(existing, "snap-a", ["p0", "p1"])
    expect([...plan.chunksToSoftDelete].sort()).toEqual(["c-0b", "c-2", "c-foreign"])
    expect(plan.chunksToUpsert).toEqual([
      { index: 0, data: "p0" },
      { index: 1, data: "p1" },
    ])
  })
})
