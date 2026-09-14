import { expect, test } from "bun:test"
import { inventorySnapshotName } from "akasha/temper/watcher/modules/watcher-inventory-snapshot-name/watcher-inventory-snapshot-name.module.code.ts"

test("a snapshot is named for the moment the data was captured", () => {
  expect(inventorySnapshotName("2026-09-02T13:45:07.000Z")).toBe("2026-09-02-13-45-07")
})

test("a name holds no colon and no letter parting date from time", () => {
  const name = inventorySnapshotName("2026-09-02T13:45:07.000Z")
  expect(name).not.toContain(":")
  expect(name).not.toContain("T")
})

test("a name holds nothing finer than whole seconds", () => {
  expect(inventorySnapshotName("2026-09-02T13:45:07.999Z")).toBe("2026-09-02-13-45-07")
})

test("the start of the epoch is named without special handling", () => {
  expect(inventorySnapshotName("1970-01-01T00:00:00.000Z")).toBe("1970-01-01-00-00-00")
})
