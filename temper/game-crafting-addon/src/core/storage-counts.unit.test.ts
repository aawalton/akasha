import { expect, test } from "bun:test"
import { applyStorageCounts } from "./storage-counts"
import type { StorageMap } from "./storage-prune"

test("absent entry (removed-after-prune path): returns undefined, mutates nothing, does not throw", () => {
  const storage: StorageMap = {
    "|H0:item:2:0|h|h": { "Alanarre's First Storage": 7 },
  }
  const result = applyStorageCounts(storage, "|H0:item:1:0|h|h", [
    ["Craft Bag", 0],
    ["Bank", 0],
    ["Alanarre's First Storage", 0],
  ])
  expect(result).toBeUndefined()
  expect(storage["|H0:item:1:0|h|h"]).toBeUndefined()
  expect(storage["|H0:item:2:0|h|h"]).toEqual({ "Alanarre's First Storage": 7 })
})

test("existing entry (decrement path): positive counts set, zero counts cleared, slot returned", () => {
  const storage: StorageMap = {
    "|H0:item:3:0|h|h": { "Craft Bag": 20, Bank: 5, "Alanarre's First Storage": 2 },
  }
  const result = applyStorageCounts(storage, "|H0:item:3:0|h|h", [
    ["Craft Bag", 18],
    ["Bank", 0],
    ["Alanarre's First Storage", 2],
  ])
  expect(result).toBe(storage["|H0:item:3:0|h|h"])
  expect(storage["|H0:item:3:0|h|h"]).toEqual({
    "Craft Bag": 18,
    Bank: undefined,
    "Alanarre's First Storage": 2,
  })
})

test("all counts zero: every name cleared, entry itself left in place for the prune", () => {
  const storage: StorageMap = {
    "|H0:item:4:0|h|h": { "Craft Bag": 1, Bank: 1 },
  }
  const result = applyStorageCounts(storage, "|H0:item:4:0|h|h", [
    ["Craft Bag", 0],
    ["Bank", 0],
  ])
  expect(result).not.toBeUndefined()
  expect(storage["|H0:item:4:0|h|h"]).toEqual({ "Craft Bag": undefined, Bank: undefined })
})
