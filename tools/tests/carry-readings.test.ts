import { describe, expect, it } from "bun:test"
import { bodyItself, carriedReading, type Moved, sameBody } from "../lib/read-record.ts"
import type { Entry } from "../../agent/read-record.ts"

const FILE = "/var/tmp/carry-readings-test/body.md"

function moved(from: string, to: string, wasLines: number, lines: number): Moved {
  return { path: FILE, from, to, wasLines, lines }
}

function read(mark: string, covered: number): Entry {
  return { at: 1000, spans: [[1, covered]], seen: 2000, blob: mark }
}

function reading(entry: Entry | null) {
  return entry === null
    ? null
    : { at: entry.at, spans: entry.spans, blob: entry.blob ?? null, mechanical: entry.mechanical ?? null }
}

describe("a reading survives a mechanical change", () => {
  it("counts a whole reading against the body the change left", () => {
    const carried = carriedReading(read("aaa", 4), moved("aaa", "bbb", 4, 5))
    expect(carried).not.toBeNull()
    expect(sameBody(reading(carried), "bbb")).toBe(true)
    expect(carried?.spans).toEqual([[1, 5]])
  })

  it("still refuses that reading to a write of the same file", () => {
    const carried = carriedReading(read("aaa", 4), moved("aaa", "bbb", 4, 4))
    expect(bodyItself(reading(carried), "bbb")).toBe(false)
  })

  it("leaves a reading that never covered the whole body where it was", () => {
    expect(carriedReading(read("aaa", 2), moved("aaa", "bbb", 4, 4))).toBeNull()
  })

  it("carries the same reading across a second mechanical change", () => {
    const once = carriedReading(read("aaa", 4), moved("aaa", "bbb", 4, 4))
    expect(once).not.toBeNull()
    const twice = carriedReading(once as Entry, moved("bbb", "ccc", 4, 4))
    expect(sameBody(reading(twice), "ccc")).toBe(true)
  })

  it("carries nothing where the body read was not the one that moved", () => {
    expect(carriedReading(read("zzz", 4), moved("aaa", "bbb", 4, 4))).toBeNull()
  })

  it("leaves a body the change emptied covering its first line rather than none", () => {
    const carried = carriedReading(read("aaa", 4), moved("aaa", "bbb", 4, 0))
    expect(carried?.spans).toEqual([[1, 1]])
  })
})
