
import { describe, expect, test } from "bun:test"
import { extractEnvironVar, readProcStat, scanProcEntries } from "../lib/proc-scan.ts"

describe("extractEnvironVar", () => {
  test("matches a whole key, never a key that merely prefixes another", () => {
    const blob = "AGENT_ID_SUFFIX=wrong\0AGENT_ID=right\0PATH=/usr/bin"
    expect(extractEnvironVar(blob, "AGENT_ID")).toBe("right")
  })

  test("an absent key is undefined rather than an empty string", () => {
    expect(extractEnvironVar("PATH=/usr/bin", "AGENT_ID")).toBeUndefined()
    expect(extractEnvironVar("AGENT_ID=\0PATH=/usr/bin", "AGENT_ID")).toBe("")
  })
})

describe("readProcStat", () => {
  test("a pid that is not there yields both fields absent rather than a guess", () => {
    expect(readProcStat("0")).toEqual({ state: undefined, ppid: undefined })
  })
})

describe("scanProcEntries", () => {
  test("an unreadable /proc answers ok:false, which is not the same as finding nothing", () => {
    const answer = scanProcEntries(() => {
      throw new Error("no /proc")
    })
    expect(answer.ok).toBe(false)
    expect(answer.entries).toEqual([])
  })

  test("a readable /proc holding no agent process answers ok:true and no entries", () => {
    const answer = scanProcEntries(() => [])
    expect(answer.ok).toBe(true)
    expect(answer.entries).toEqual([])
  })

  test("a non-numeric /proc entry is skipped rather than read as a pid", () => {
    expect(scanProcEntries(() => ["self", "cpuinfo", "net"]).entries).toEqual([])
  })
})
