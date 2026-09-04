import { expect, test } from "bun:test"
import {
  inventoryChunkName,
  inventorySnapshotName,
} from "./watcher-inventory-snapshot-name.module.code.ts"

test("a snapshot is named for the moment the data was captured", () => {
  expect(inventorySnapshotName(Date.UTC(2026, 8, 2, 13, 45, 7))).toBe("2026-09-02-13-45-07")
})

test("a name holds no colon and no letter parting date from time", () => {
  const name = inventorySnapshotName(Date.UTC(2026, 8, 2, 13, 45, 7))
  expect(name).not.toContain(":")
  expect(name).not.toContain("T")
})

test("a name holds nothing finer than whole seconds", () => {
  expect(inventorySnapshotName(Date.UTC(2026, 8, 2, 13, 45, 7, 999))).toBe("2026-09-02-13-45-07")
})

test("the start of the epoch is named without special handling", () => {
  expect(inventorySnapshotName(0)).toBe("1970-01-01-00-00-00")
})

test("a chunk is named for its snapshot and the number of the chunk", () => {
  expect(inventoryChunkName("2026-09-02-13-45-07", 0)).toBe("2026-09-02-13-45-07-0")
  expect(inventoryChunkName("2026-09-02-13-45-07", 12)).toBe("2026-09-02-13-45-07-12")
})
