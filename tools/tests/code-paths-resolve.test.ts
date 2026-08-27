
import { afterAll, beforeAll, describe, expect, test } from "bun:test"
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { codePathsResolve } from "../audits/code-paths-resolve.ts"
import type { RepoView } from "../lib/check.ts"
import { refusalDirIn } from "../lib/refusal.ts"

let instructions = ""
let code = ""

function put(root: string, rel: string, body: string): void {
  const file = `${root}/${rel}`
  mkdirSync(file.slice(0, file.lastIndexOf("/")), { recursive: true })
  writeFileSync(file, body)
}

function reaching(ref: string): string {
  return `import { codeModule } from "../../lib/code-import.ts"\nconst REF = "${ref}"\nexport const held = codeModule(REF)\n`
}

function view(): RepoView {
  return {
    roots: { akasha: instructions, "code-editor": "/nonexistent-code-editor" },
    name: "akasha",
    documents: [],
    read: () => "",
    exists: (absolute) => existsSync(absolute),
  }
}

function seedRefusals(root: string): void {
  const live = `${import.meta.dir}/../..`
  const refusals = refusalDirIn(live)
  for (const slug of [
    "code-path-unresolved",
    "code-reach-unresolved",
    "code-specifier-unresolved",
  ]) {
    put(root, `${refusals}/${slug}.refusal.md`, "")
    copyFileSync(`${live}/${refusals}/${slug}.refusal.md`, `${root}/${refusals}/${slug}.refusal.md`)
  }
}

beforeAll(() => {
  instructions = mkdtempSync("/var/tmp/code-paths-instructions-")
  code = mkdtempSync("/var/tmp/code-paths-code-")
  put(code, "packages/agents/shared/db.ts", "export const there = 1\n")
  put(code, "node_modules/@agents/shared/index.ts", "export const there = 1\n")
  put(
    code,
    "node_modules/@agents/shared/package.json",
    JSON.stringify({ name: "@agents/shared", exports: { ".": "./index.ts" } })
  )
  seedRefusals(instructions)
})

afterAll(() => {
  for (const root of [instructions, code]) if (root !== "") rmSync(root, { recursive: true, force: true })
})

describe("codePathsResolve", () => {
  test("a reference standing nowhere is refused whichever spelling names it", () => {
    put(instructions, "tools/commands/claude-account/gone.ts", reaching("packages/agents/shared/moved-away.ts"))
    put(instructions, "tools/commands/claude-account/away.ts", reaching("@agents/moved-away"))
    const outcome = codePathsResolve(view())
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toHaveLength(2)
    expect(outcome.messages.join("\n")).toContain("packages/agents/shared/moved-away.ts")
    expect(outcome.messages.join("\n")).toContain("@agents/moved-away")
  })

  test("a reference that stands is measured, a bare literal counts wherever it stands, and a tools/tests fixture does not", () => {
    put(instructions, "tools/commands/claude-account/held.ts", reaching("packages/agents/shared/db.ts"))
    put(instructions, "tools/commands/claude-account/named.ts", reaching("@agents/shared"))
    put(instructions, "tools/lib/barrel.ts", 'const GENERATED = "packages/agents/shared/db.ts"\n')
    put(instructions, "services/probe.ts", 'const READING = "packages/agents/shared/db.ts"\n')
    put(instructions, "tools/tests/some.test.ts", reaching("packages/infra/x.ts"))
    const outcome = codePathsResolve(view())
    expect(outcome.messages).toHaveLength(2)
    expect(outcome.population.measured).toBe(6)
  })

  test("a tree holding nothing to read fails rather than passing over nothing", () => {
    const empty = mkdtempSync("/var/tmp/code-paths-empty-")
    try {
      const outcome = codePathsResolve({ ...view(), roots: { akasha: empty, "code-editor": "/nonexistent-code-editor" } })
      expect(outcome.verdict).toBe("fail")
      expect(outcome.population.measured).toBe(0)
    } finally {
      rmSync(empty, { recursive: true, force: true })
    }
  })

  test("a reference handed to a loader is judged against the code checkout alone, while a plain literal beside it stands here", () => {
    const handed = mkdtempSync("/var/tmp/code-paths-handed-")
    try {
      seedRefusals(handed)
      put(handed, "packages/agents/shared/only-here.ts", "export const here = 1\n")
      put(handed, "tools/commands/claude-account/hands.ts", reaching("packages/agents/shared/only-here.ts"))
      put(handed, "tools/lib/names.ts", 'const SCRIPT = "packages/agents/shared/only-here.ts"\n')
      put(handed, "tools/lib/dangles.ts", 'const GONE = "packages/agents/shared/never-was.ts"\n')
      const outcome = codePathsResolve({
        ...view(),
        roots: { akasha: handed, "code-editor": "/nonexistent-code-editor" },
      })
      expect(outcome.verdict).toBe("fail")
      expect(outcome.messages).toHaveLength(2)
      expect(outcome.messages.join("\n")).toContain("looks nowhere else")
      expect(outcome.messages.join("\n")).toContain("neither repository looked in")
    } finally {
      rmSync(handed, { recursive: true, force: true })
    }
  })

  test("a path only the instructions repo holds is reached there, ahead of the code checkout", () => {
    const ported = mkdtempSync("/var/tmp/code-paths-ported-")
    try {
      seedRefusals(ported)
      put(ported, "packages/agents/shared/ported.ts", "export const here = 1\n")
      put(ported, "tools/lib/ported.ts", 'const SCRIPT = "packages/agents/shared/ported.ts"\n')
      const outcome = codePathsResolve({
        ...view(),
        roots: { akasha: ported, "code-editor": "/nonexistent-code-editor" },
      })
      expect(outcome.population.measured).toBe(1)
      expect(outcome.messages).toHaveLength(0)
      expect(outcome.detail).toContain("1 of those stand here")
    } finally {
      rmSync(ported, { recursive: true, force: true })
    }
  })

  test("a bare path both trees hold is named ambiguous rather than reached in either", () => {
    const both = mkdtempSync("/var/tmp/code-paths-both-")
    try {
      seedRefusals(both)
      put(both, "packages/agents/shared/db.ts", "export const here = 1\n")
      put(both, "tools/lib/either.ts", 'const SCRIPT = "packages/agents/shared/db.ts"\n')
      const outcome = codePathsResolve({
        ...view(),
        roots: { akasha: both, "code-editor": "/nonexistent-code-editor" },
      })
      expect(outcome.population.measured).toBe(0)
      expect(outcome.messages).toHaveLength(0)
    } finally {
      rmSync(both, { recursive: true, force: true })
    }
  })
})
