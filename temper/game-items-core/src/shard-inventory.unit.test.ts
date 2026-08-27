import { describe, expect, it } from "bun:test"
import { MAX_CHUNK_BYTES, shardInventoryJson } from "./shard-inventory"

describe("shardInventoryJson", () => {
  it("returns the single input unchanged when the payload fits", () => {
    const json = '{"locations":{},"meta":{"lastFullScan":1}}'
    const chunks = shardInventoryJson(json)
    expect(chunks).toEqual([json])
  })

  it("returns [json] for the empty string", () => {
    expect(shardInventoryJson("")).toEqual([""])
  })

  it("returns a single chunk for a payload exactly at the boundary", () => {
    const json = "a".repeat(MAX_CHUNK_BYTES)
    const chunks = shardInventoryJson(json)
    expect(chunks).toHaveLength(1)
    expect(chunks[0]).toBe(json)
  })

  it("splits into two chunks for a payload one over the boundary", () => {
    const json = "a".repeat(MAX_CHUNK_BYTES + 1)
    const chunks = shardInventoryJson(json)
    expect(chunks).toHaveLength(2)
    expect(chunks[0]).toHaveLength(MAX_CHUNK_BYTES)
    expect(chunks[1]).toHaveLength(1)
    expect(chunks.join("")).toBe(json)
  })

  it("splits a large payload into multiple slices that rejoin to the original", () => {
    const json = "x".repeat(MAX_CHUNK_BYTES * 2 + Math.floor(MAX_CHUNK_BYTES / 2))
    const chunks = shardInventoryJson(json)
    expect(chunks).toHaveLength(3)
    for (const chunk of chunks) {
      expect(chunk.length).toBeLessThanOrEqual(MAX_CHUNK_BYTES)
    }
    expect(chunks.join("")).toBe(json)
  })

  it("preserves exact content across shard boundaries (lossless round-trip)", () => {
    const parts: string[] = []
    for (let i = 0; i < MAX_CHUNK_BYTES * 2 + 137; i++) {
      parts.push(String.fromCharCode(33 + (i % 90)))
    }
    const json = parts.join("")
    const chunks = shardInventoryJson(json)
    expect(chunks.join("")).toBe(json)
  })
})
