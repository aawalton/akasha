import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { writeFileAtomicWithRetry } from "./retry"

describe("writeFileAtomicWithRetry", () => {
  let dir: string

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), "atomic-write-"))
  })

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  test("creates the target file with the given content", () => {
    const path = join(dir, "fresh.lua")
    writeFileAtomicWithRetry(path, "Vars = {\n}")
    expect(readFileSync(path, "utf-8")).toBe("Vars = {\n}")
  })

  test("replaces an existing file", () => {
    const path = join(dir, "existing.lua")
    writeFileSync(path, "old content")
    writeFileAtomicWithRetry(path, "new content")
    expect(readFileSync(path, "utf-8")).toBe("new content")
  })

  test("leaves no temp file behind", () => {
    const path = join(dir, "clean.lua")
    writeFileAtomicWithRetry(path, "Vars = {\n}")
    const leftovers = readdirSync(dir).filter((name) => name.includes(".tmp"))
    expect(leftovers).toEqual([])
  })
})
