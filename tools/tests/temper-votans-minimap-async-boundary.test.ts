import { describe, expect, it } from "bun:test"
import { readFileSync, readdirSync } from "node:fs"
import { join, relative } from "node:path"
import { z } from "zod"
import { codeRoot } from "../lib/code-root.ts"

const SRC_REL = "temper/game-navigation-addon/src/votans-minimap"

const SRC_DIR = join(codeRoot(), SRC_REL)

const SANCTIONED_CREATOR = join(SRC_DIR, "core", "shared.ts")

const BARE_CREATE = /\b(?:async|LibAsync)\.Create\s*\(/

const FILE_TEXT = z.string()

const collectTsFiles = (dir: string, out: string[]): undefined => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      collectTsFiles(full, out)
      continue
    }
    if (!entry.name.endsWith(".ts")) continue
    if (entry.name.endsWith(".d.ts") || entry.name.endsWith(".test.ts")) continue
    out.push(full)
  }
}

describe("votans-minimap LibAsync task boundary", () => {
  it("creates every LibAsync task through createAsyncTask, and looks at more than no file", () => {
    const files: string[] = []
    collectTsFiles(SRC_DIR, files)

    expect(files.length).toBeGreaterThan(0)

    const offenders = files
      .filter((file) => file !== SANCTIONED_CREATOR)
      .filter((file) => BARE_CREATE.test(FILE_TEXT.parse(readFileSync(file, "utf8"))))
      .map((file) => relative(SRC_DIR, file))

    expect(offenders).toEqual([])
  })
})
