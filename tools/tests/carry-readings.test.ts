import { describe, expect, it } from "bun:test"
import { bodyItself, carriedReading, type Moved, sameBody } from "../lib/read-record.ts"
import type { Entry } from "../../agent/read-record.ts"

const FILE = "/var/tmp/carry-readings-test/body.md"

function moved(from: string, to: string): Moved {
  return { path: FILE, from, to }
}

function read(oid: string): Entry {
  return { oid, seenAt: 2000 }
}

describe("a reading survives a mechanical change", () => {
  it("counts the reading against the body the change left", () => {
    const carried = carriedReading(read("aaa"), moved("aaa", "bbb"))
    expect(carried).not.toBeNull()
    expect(sameBody(carried, "bbb")).toBe(true)
  })

  it("still refuses that reading to a write of the same file", () => {
    const carried = carriedReading(read("aaa"), moved("aaa", "bbb"))
    expect(bodyItself(carried, "bbb")).toBe(false)
  })

  it("keeps the body as read, so a diff has a base the agent saw", () => {
    const carried = carriedReading(read("aaa"), moved("aaa", "bbb"))
    expect(carried?.oid).toBe("aaa")
  })

  it("carries the same reading across a second mechanical change", () => {
    const once = carriedReading(read("aaa"), moved("aaa", "bbb"))
    expect(once).not.toBeNull()
    const twice = carriedReading(once as Entry, moved("bbb", "ccc"))
    expect(sameBody(twice, "ccc")).toBe(true)
  })

  it("carries nothing where the body read was not the one that moved", () => {
    expect(carriedReading(read("zzz"), moved("aaa", "bbb"))).toBeNull()
  })
})
