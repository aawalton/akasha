import { expect, test } from "bun:test"
import { pruneEmptyStorage, type StorageMap } from "./storage-prune"

test("prunes an empty {} entry, preserves a non-empty entry's exact counts", () => {
  const storage: StorageMap = {
    "|H0:item:1:0|h|h": {},
    "|H0:item:2:0|h|h": { "Alanarre's First Storage": 7 },
  }
  const removed = pruneEmptyStorage(storage)
  expect(removed).toBe(1)
  expect(storage["|H0:item:1:0|h|h"]).toBeUndefined()
  expect(storage["|H0:item:2:0|h|h"]).toEqual({ "Alanarre's First Storage": 7 })
})

test("drops zero/undefined counts within a slot and prunes the entry when none remain", () => {
  const storage: StorageMap = {
    "|H0:item:3:0|h|h": { Bank: 0, "Alanarre's Second Storage": undefined },
  }
  const removed = pruneEmptyStorage(storage)
  expect(removed).toBe(1)
  expect(storage["|H0:item:3:0|h|h"]).toBeUndefined()
})

test("keeps positive counts while stripping zero counts in the same slot", () => {
  const storage: StorageMap = {
    "|H0:item:4:0|h|h": { Bank: 0, "Alanarre's First Storage": 3 },
  }
  const removed = pruneEmptyStorage(storage)
  expect(removed).toBe(0)
  expect(storage["|H0:item:4:0|h|h"]).toEqual({ "Alanarre's First Storage": 3 })
})

test("is idempotent — a second pass over already-pruned storage removes nothing", () => {
  const storage: StorageMap = {
    "|H0:item:5:0|h|h": {},
    "|H0:item:6:0|h|h": { "Craft Bag": 12 },
  }
  expect(pruneEmptyStorage(storage)).toBe(1)
  expect(pruneEmptyStorage(storage)).toBe(0)
  expect(storage["|H0:item:6:0|h|h"]).toEqual({ "Craft Bag": 12 })
})

test("operates only on the storage table it is given (per-account scope, never cross-account)", () => {
  const accountA: StorageMap = { "|H0:item:7:0|h|h": {} }
  const accountB: StorageMap = { "|H0:item:7:0|h|h": { "Other's First Storage": 9 } }
  pruneEmptyStorage(accountA)
  expect(accountA["|H0:item:7:0|h|h"]).toBeUndefined()
  expect(accountB["|H0:item:7:0|h|h"]).toEqual({ "Other's First Storage": 9 })
})
