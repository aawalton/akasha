import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import {
  isStableRun,
  looksStructurallyComplete,
  matchesSnapshot,
  readFileWhenStable,
  type StatSnapshot,
} from "./stable-read"

describe("looksStructurallyComplete", () => {
  test("complete SavedVariables content ends with a closing brace", () => {
    expect(
      looksStructurallyComplete('TemperDataMining_SavedVariables = {\n  ["items"] = {},\n}')
    ).toBe(true)
  })

  test("trailing whitespace and newlines after the brace are tolerated", () => {
    expect(looksStructurallyComplete("Vars = {\n}\n\n  ")).toBe(true)
  })

  test("content truncated mid-string fails", () => {
    expect(looksStructurallyComplete('Vars = {\n  ["item"] = "unterminat')).toBe(false)
  })

  test("empty content fails", () => {
    expect(looksStructurallyComplete("")).toBe(false)
  })
})

describe("isStableRun", () => {
  const snap = (size: number, mtimeMs: number): StatSnapshot => ({ size, mtimeMs })

  test("fewer observations than required is not stable", () => {
    expect(isStableRun([snap(10, 1), snap(10, 1)], 3)).toBe(false)
  })

  test("a run of identical observations is stable", () => {
    expect(isStableRun([snap(5, 1), snap(10, 2), snap(10, 2), snap(10, 2)], 3)).toBe(true)
  })

  test("a size change inside the tail is not stable", () => {
    expect(isStableRun([snap(10, 2), snap(11, 2), snap(11, 2)], 3)).toBe(false)
  })

  test("an mtime change inside the tail is not stable", () => {
    expect(isStableRun([snap(10, 2), snap(10, 3), snap(10, 3)], 3)).toBe(false)
  })
})

describe("filesystem-backed behavior", () => {
  let dir: string

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), "stable-read-"))
  })

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  test("readFileWhenStable returns content and snapshot for a quiescent file", async () => {
    const path = join(dir, "stable.lua")
    writeFileSync(path, "Vars = {\n}")
    const result = await readFileWhenStable(path, { pollMs: 5, stablePolls: 2, timeoutMs: 1000 })
    expect(result).not.toBeNull()
    expect(result?.content).toBe("Vars = {\n}")
    expect(result?.snapshot.size).toBe(10)
  })

  test("readFileWhenStable returns null for a missing file", async () => {
    const result = await readFileWhenStable(join(dir, "absent.lua"), {
      pollMs: 5,
      stablePolls: 2,
      timeoutMs: 200,
    })
    expect(result).toBeNull()
  })

  test("readFileWhenStable returns null when the file never stabilizes before timeout", async () => {
    const path = join(dir, "growing.lua")
    writeFileSync(path, "Vars = {")
    const writer = setInterval(() => {
      writeFileSync(path, `Vars = { ${Date.now()}`, { flag: "a" })
    }, 5)
    try {
      const result = await readFileWhenStable(path, { pollMs: 10, stablePolls: 3, timeoutMs: 150 })
      expect(result).toBeNull()
    } finally {
      clearInterval(writer)
    }
  })

  test("readFileWhenStable waits out an in-progress write and then succeeds", async () => {
    const path = join(dir, "settling.lua")
    writeFileSync(path, "Vars = {")
    let appends = 0
    const writer = setInterval(() => {
      appends++
      if (appends <= 3) {
        writeFileSync(path, "\n  [1] = 1,", { flag: "a" })
      } else {
        writeFileSync(path, "\n}", { flag: "a" })
        clearInterval(writer)
      }
    }, 10)
    const result = await readFileWhenStable(path, { pollMs: 15, stablePolls: 2, timeoutMs: 2000 })
    clearInterval(writer)
    expect(result).not.toBeNull()
    expect(result?.content.endsWith("\n}")).toBe(true)
  })

  test("matchesSnapshot is true while unchanged and false after a write", async () => {
    const path = join(dir, "watched.lua")
    writeFileSync(path, "Vars = {\n}")
    const stable = await readFileWhenStable(path, { pollMs: 5, stablePolls: 2, timeoutMs: 1000 })
    expect(stable).not.toBeNull()
    if (stable === null) return
    expect(matchesSnapshot(path, stable.snapshot)).toBe(true)
    writeFileSync(path, "Vars = {\n  [1] = 1,\n}")
    expect(matchesSnapshot(path, stable.snapshot)).toBe(false)
  })

  test("matchesSnapshot is false for a missing file", () => {
    expect(matchesSnapshot(join(dir, "absent.lua"), { size: 1, mtimeMs: 1 })).toBe(false)
  })
})
