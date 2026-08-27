import { describe, expect, it } from "bun:test"
import { z } from "zod"
import { assembleInventory } from "./assemble-inventory"

const LOOSE_RECORD_SCHEMA = z.record(z.string(), z.unknown())

function asLooseRecord(value: unknown): Record<string, unknown> | null {
  if (value === null) return null
  return LOOSE_RECORD_SCHEMA.parse(value)
}

describe("assembleInventory", () => {
  it("returns null for empty input", () => {
    expect(assembleInventory([])).toBeNull()
  })

  it("returns parsed InventoryDatabase shape for a single valid chunk", () => {
    const db = {
      locations: {},
      meta: { displayName: "Tester", worldName: "NA Megaserver", lastFullScan: 1700000000 },
    }
    const chunks = [{ chunkIndex: 0, data: JSON.stringify(db) }]
    const result = asLooseRecord(assembleInventory(chunks))
    expect(result).not.toBeNull()
    expect(result).toEqual(db)
  })

  it("reassembles multiple chunks already in order", () => {
    const db = {
      locations: {},
      meta: { displayName: "Ordered", worldName: "NA", lastFullScan: 1 },
    }
    const full = JSON.stringify(db)
    const a = full.slice(0, 10)
    const b = full.slice(10, 25)
    const c = full.slice(25)
    const chunks = [
      { chunkIndex: 0, data: a },
      { chunkIndex: 1, data: b },
      { chunkIndex: 2, data: c },
    ]
    const result = asLooseRecord(assembleInventory(chunks))
    expect(result).toEqual(db)
  })

  it("sorts chunks by chunkIndex before concatenating (out-of-order input)", () => {
    const chunks = [
      { chunkIndex: 2, data: "}" },
      { chunkIndex: 0, data: '{"a' },
      { chunkIndex: 1, data: '":1' },
    ]
    const result = asLooseRecord(assembleInventory(chunks))
    expect(result).toEqual({ a: 1 })
  })

  it("returns null when concatenation across chunks is malformed JSON", () => {
    const chunks = [
      { chunkIndex: 0, data: '{"locations":' },
      { chunkIndex: 1, data: "{not json" },
    ]
    expect(assembleInventory(chunks)).toBeNull()
  })

  it("returns null when a single chunk is itself invalid JSON", () => {
    const chunks = [{ chunkIndex: 0, data: "not json at all" }]
    expect(assembleInventory(chunks)).toBeNull()
  })
})
