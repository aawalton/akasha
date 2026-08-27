import { describe, expect, test } from "bun:test"
import { execFileSync } from "node:child_process"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { isAbsolute, join, resolve } from "node:path"

import { findFiles } from "./file-finder.ts"

function makeTinyRepo(layout: Record<string, string>): { root: string; cleanup: () => void } {
  const dir = mkdtempSync(join(tmpdir(), "file-finder-"))
  for (const [path, contents] of Object.entries(layout)) {
    const abs = join(dir, path)
    mkdirSync(resolve(abs, ".."), { recursive: true })
    writeFileSync(abs, contents)
  }
  execFileSync("git", ["init", "-q", "-b", "main"], { cwd: dir })
  execFileSync("git", ["config", "user.email", "test@local"], { cwd: dir })
  execFileSync("git", ["config", "user.name", "test"], { cwd: dir })
  execFileSync("git", ["add", "-A"], { cwd: dir })
  execFileSync("git", ["commit", "-q", "-m", "init"], { cwd: dir })
  return { root: dir, cleanup: () => rmSync(dir, { recursive: true, force: true }) }
}

describe("findFiles", () => {
  test("matches files via glob, respects exclude segments", () => {
    const { root, cleanup } = makeTinyRepo({
      "src/a.ts": "",
      "src/b.ts": "",
      "node_modules/lib/c.ts": "",
      "src/docs/d.md": "",
    })
    try {
      const out = findFiles({
        cwd: root,
        patterns: ["**/*.ts"],
        absolute: false,
      })
      expect([...out].sort()).toEqual(["src/a.ts", "src/b.ts"])
    } finally {
      cleanup()
    }
  })

  test("multiple patterns are de-duplicated and sorted", () => {
    const { root, cleanup } = makeTinyRepo({
      "a.ts": "",
      "a.md": "",
      "b.ts": "",
    })
    try {
      const out = findFiles({
        cwd: root,
        patterns: ["**/*.ts", "**/*.{ts,md}"],
        absolute: false,
      })
      expect(out).toEqual(["a.md", "a.ts", "b.ts"])
    } finally {
      cleanup()
    }
  })

  test("custom exclude overrides CHECK_EXEMPT_DIRS", () => {
    const { root, cleanup } = makeTinyRepo({
      "src/a.md": "",
      "docs/b.md": "",
      "node_modules/c.md": "",
    })
    try {
      const out = findFiles({
        cwd: root,
        patterns: ["**/*.md"],
        exclude: new Set(["docs"]),
        absolute: false,
      })
      expect([...out].sort()).toEqual(["node_modules/c.md", "src/a.md"])
    } finally {
      cleanup()
    }
  })

  test("absolute: true returns absolute paths", () => {
    const { root, cleanup } = makeTinyRepo({ "a.ts": "" })
    try {
      const out = findFiles({ cwd: root, patterns: ["**/*.ts"] })
      expect(out.length).toBe(1)
      const [first] = out
      if (first === undefined) throw new Error("expected file")
      expect(isAbsolute(first)).toBe(true)
      expect(first).toBe(resolve(root, "a.ts"))
    } finally {
      cleanup()
    }
  })

  test("dot: true scans hidden directories", () => {
    const { root, cleanup } = makeTinyRepo({
      ".claude/SKILL.md": "",
      "src/b.md": "",
    })
    try {
      const noDot = findFiles({
        cwd: root,
        patterns: ["**/*.md"],
        absolute: false,
      })
      expect([...noDot].sort()).toEqual(["src/b.md"])

      const withDot = findFiles({
        cwd: root,
        patterns: ["**/*.md"],
        dot: true,
        absolute: false,
      })
      expect([...withDot].sort()).toEqual([".claude/SKILL.md", "src/b.md"])
    } finally {
      cleanup()
    }
  })
})
