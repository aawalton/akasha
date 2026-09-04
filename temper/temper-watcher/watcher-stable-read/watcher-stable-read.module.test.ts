import { expect, test } from "bun:test"
import { mkdtempSync, rmSync, statSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  isStableRun,
  looksStructurallyComplete,
  matchesSnapshot,
  readFileWhenStable,
  type StatSnapshot,
} from "./watcher-stable-read.module.code.ts"

const SCRATCH_AT = "/var/tmp"

const SETTLED: StatSnapshot = { size: 10, mtimeMs: 100 }

function feed(snapshots: readonly (StatSnapshot | null)[], content = "{ }") {
  let i = 0
  const waits: number[] = []
  return {
    waits,
    deps: {
      snapshotOf: () => snapshots[Math.min(i++, snapshots.length - 1)] ?? null,
      readFile: () => content,
      sleep: async (ms: number) => {
        waits.push(ms)
      },
      now: () => 0,
    },
  }
}

test("a file the game finished writing closes with a brace", () => {
  expect(looksStructurallyComplete('TemperSales = { ["a"] = 1 }')).toBe(true)
  expect(looksStructurallyComplete("TemperSales = { \n}\n\n")).toBe(true)
})

test("a file broken off partway does not close with a brace", () => {
  expect(looksStructurallyComplete('TemperSales = { ["a"] = ')).toBe(false)
  expect(looksStructurallyComplete("")).toBe(false)
})

test("fewer looks than are required is never enough", () => {
  expect(isStableRun([SETTLED, SETTLED], 3)).toBe(false)
  expect(isStableRun([], 1)).toBe(false)
})

test("enough looks agreeing in a row is settled", () => {
  expect(isStableRun([SETTLED, SETTLED, SETTLED], 3)).toBe(true)
})

test("a file judged settled is judged on size and modification time together", () => {
  expect(isStableRun([SETTLED, { size: 11, mtimeMs: 100 }, SETTLED], 3)).toBe(false)
  expect(isStableRun([SETTLED, { size: 10, mtimeMs: 101 }, SETTLED], 3)).toBe(false)
})

test("only the most recent looks count toward being settled", () => {
  expect(isStableRun([{ size: 1, mtimeMs: 1 }, SETTLED, SETTLED, SETTLED], 3)).toBe(true)
})

test("a file that went away while being watched is answered as nothing", async () => {
  const f = feed([null])
  expect(await readFileWhenStable("/game/x.lua", { stablePolls: 2 }, f.deps)).toBeNull()
})

test("a file still unsettled at the deadline is answered as nothing", async () => {
  let n = 0
  const deps = {
    snapshotOf: () => ({ size: n++, mtimeMs: n }),
    readFile: () => "{}",
    sleep: async () => {},
    now: () => n * 1000,
  }
  expect(await readFileWhenStable("/game/x.lua", { timeoutMs: 5000 }, deps)).toBeNull()
})

test("a settled file is read and answered with its snapshot", async () => {
  const f = feed([SETTLED, SETTLED, SETTLED, SETTLED], "{ ok = true }")
  const read = await readFileWhenStable("/game/x.lua", { stablePolls: 3 }, f.deps)
  expect(read?.content).toBe("{ ok = true }")
  expect(read?.snapshot).toEqual(SETTLED)
})

test("a file unchanged since it was looked at matches the look", () => {
  const dir = mkdtempSync(join(SCRATCH_AT, "akasha-watcher-stable-read-"))
  try {
    const path = join(dir, "TemperSales.lua")
    writeFileSync(path, "TemperSales = { }")
    const stat = statSync(path)
    const snapshot: StatSnapshot = { size: stat.size, mtimeMs: stat.mtimeMs }
    expect(matchesSnapshot(path, snapshot)).toBe(true)
    writeFileSync(path, "TemperSales = { [1] = 1 }")
    expect(matchesSnapshot(path, snapshot)).toBe(false)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test("a file that is not there matches no look", () => {
  expect(matchesSnapshot("/nowhere/at/all/TemperSales.lua", { size: 1, mtimeMs: 1 })).toBe(false)
})

test("a file that changed between the settled look and the read is looked at afresh", async () => {
  const moved: StatSnapshot = { size: 99, mtimeMs: 999 }
  let i = 0
  const seen: StatSnapshot[] = [SETTLED, SETTLED, SETTLED, moved, moved, moved, moved]
  const deps = {
    snapshotOf: () => seen[Math.min(i++, seen.length - 1)] ?? null,
    readFile: () => "{}",
    sleep: async () => {},
    now: () => 0,
  }
  const read = await readFileWhenStable("/game/x.lua", { stablePolls: 3 }, deps)
  expect(read?.snapshot).toEqual(moved)
})
