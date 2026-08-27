import { describe, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { alsoIn, commandIn, entryIn, namedIn } from "../lib/service-wrapper/command.ts"
import { digestOf, dirsOf, movedBetween } from "../lib/service-wrapper/following.ts"

describe("what the wrapper is told to run", () => {
  test("the command is what stands after the marker", () => {
    expect(commandIn(["--", "bun", "services/x.ts"])).toEqual(["bun", "services/x.ts"])
  })

  test("with no marker the whole argument list is the command", () => {
    expect(commandIn(["bun", "services/x.ts"])).toEqual(["bun", "services/x.ts"])
  })

  test("the entry watched is the command's first typescript file", () => {
    expect(entryIn(["bun", "--smol", "services/x.ts"])).toBe("services/x.ts")
  })

  test("a command naming no typescript file leaves nothing to watch", () => {
    expect(entryIn(["sleep", "60"])).toBeNull()
  })

  test("each glob stated before the marker is followed alongside the imports", () => {
    expect(alsoIn(["--also", "a/**/*.ts", "--also", "b/*.ts", "--", "bun", "x.ts"])).toEqual([
      "a/**/*.ts",
      "b/*.ts",
    ])
  })

  test("a glob standing after the marker belongs to the command, not to the wrapper", () => {
    expect(alsoIn(["--", "bun", "x.ts", "--also", "c/*.ts"])).toEqual([])
  })
})

describe("what the wrapper says moved", () => {
  test("a path is named from the repository root rather than absolutely", () => {
    expect(namedIn(["/root/tools/lib/a.ts"], "/root")).toBe("tools/lib/a.ts")
  })

  test("past five, the rest are counted rather than named", () => {
    const moved = ["a", "b", "c", "d", "e", "f", "g"].map((one) => `/root/${one}.ts`)
    expect(namedIn(moved, "/root")).toBe("a.ts, b.ts, c.ts, d.ts, e.ts and 2 more")
  })
})

describe("what a digest reports as moved", () => {
  test("a file whose bytes changed is reported", () => {
    const root = mkdtempSync(`${tmpdir()}/digest-`)
    try {
      const at = `${root}/a.ts`
      writeFileSync(at, "one", "utf8")
      const before = digestOf([at])
      writeFileSync(at, "two", "utf8")
      expect(movedBetween(before, digestOf([at]))).toEqual([at])
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  test("a file whose bytes did not change is not reported", () => {
    const root = mkdtempSync(`${tmpdir()}/digest-`)
    try {
      const at = `${root}/a.ts`
      writeFileSync(at, "one", "utf8")
      const before = digestOf([at])
      writeFileSync(at, "one", "utf8")
      expect(movedBetween(before, digestOf([at]))).toEqual([])
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  test("a file that went away is reported as moved", () => {
    const root = mkdtempSync(`${tmpdir()}/digest-`)
    try {
      const at = `${root}/a.ts`
      writeFileSync(at, "one", "utf8")
      const before = digestOf([at])
      rmSync(at)
      expect(movedBetween(before, digestOf([at]))).toEqual([at])
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  test("each file's directory is watched once, however many files it holds", () => {
    expect([...dirsOf(["/a/one.ts", "/a/two.ts", "/b/three.ts"])].sort()).toEqual(["/a", "/b"])
  })
})
