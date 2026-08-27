
import { describe, expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { toolArgv } from "../lib/tool-argv.ts"
import { CLAIMED, fileKeyDeclared, fixture, type Fixture } from "./fixture.ts"

const AGENT = "rename-repo-test"

const initiative = (domain: string, note: string): string =>
  `---\ndomain: ${domain}\n---\n\n# Intent\n\n# Sequence\n\n1. **The gap is closed**\n   - ${note}\n`

function git(cwd: string, args: readonly string[]): string {
  return Bun.spawnSync({ cmd: ["git", ...args], cwd, stdout: "pipe", stderr: "pipe" }).stdout.toString()
}

function commitsIn(root: string): number {
  return Number(git(root, ["rev-list", "--count", "HEAD"]).trim())
}

function storeAt(at: Fixture): void {
  at.installRecorder()
  fileKeyDeclared(at)
  at.document("pages/page-type/initiative.page-type.md", `slug: initiative\ndomain-parent-slug: global\n${CLAIMED}: memory:initiatives/amy/ambient-hud.md`)
  at.document("pages/domain/global.domain.md", `slug: global\ndomain-parent-slug: global\n${CLAIMED}: memory:initiatives/own-editor.md`, 20)
  at.readIt(AGENT, "pages/page-type/initiative.page-type.md")
  at.readIt(AGENT, "pages/domain/global.domain.md")
  at.put("tools/scratch-note.md", "The project was created against `initiatives/ambient-hud.md`.\n")
  at.putMemory("initiatives/ambient-hud.md", initiative("alan-harness", "The heads-up display tells him nothing."))
  at.putMemory(
    "initiatives/own-editor.md",
    initiative("code-editor", "It stands beside `initiatives/ambient-hud.md`, which names the same reader.")
  )
  for (const args of [
    ["init", "-q", "-b", "main"],
    ["config", "user.email", "test@example.com"],
    ["config", "user.name", "Test"],
    ["add", "-A"],
    ["commit", "-q", "-m", "seed"],
  ]) {
    git(at.memory, args)
  }
}

function runMv(
  at: Fixture,
  args: readonly string[],
  from: string = at.memory
): { code: number; err: string } {
  const proc = Bun.spawnSync({
    cmd: ["bun", ...toolArgv("mv.ts", args)],
    cwd: from,
    env: { ...process.env, AGENT_ID: AGENT, INSTRUCTIONS_ROOT: at.root, MEMORY_ROOT: at.memory, HOME: at.home },
    stdout: "pipe",
    stderr: "pipe",
  })
  return { code: proc.exitCode ?? -1, err: proc.stderr.toString() + proc.stdout.toString() }
}

const INTO_A_FOLDER = [
  "--repo",
  "memory",
  "--from",
  "initiatives/ambient-hud.md",
  "--to",
  "initiatives/amy/ambient-hud.md",
] as const

describe("which repo a rename addresses", () => {
  test("a memory rename carries the body, repoints the referrer and removes the orphan, in one commit", () => {
    const at = fixture()
    try {
      storeAt(at)
      const before = commitsIn(at.memory)
      runMv(at, INTO_A_FOLDER)
      expect(existsSync(`${at.memory}/initiatives/amy/ambient-hud.md`)).toBe(true)
      expect(existsSync(`${at.memory}/initiatives/ambient-hud.md`)).toBe(false)
      expect(readFileSync(`${at.memory}/initiatives/own-editor.md`, "utf8")).toContain(
        "`initiatives/amy/ambient-hud.md`"
      )
      expect(commitsIn(at.memory)).toBe(before + 1)
      expect(git(at.memory, ["status", "--porcelain"])).toBe("")
    } finally {
      at.dispose()
    }
  })

  test("the instructions repo is not searched, so its own spelling of the moved path stands", () => {
    const at = fixture()
    try {
      storeAt(at)
      const before = readFileSync(`${at.root}/tools/scratch-note.md`, "utf8")
      runMv(at, INTO_A_FOLDER)
      expect(readFileSync(`${at.root}/tools/scratch-note.md`, "utf8")).toBe(before)
    } finally {
      at.dispose()
    }
  })

  test("run from the instructions root the same pair is taken against it, which the refusal names", () => {
    const at = fixture()
    try {
      storeAt(at)
      const run = runMv(
        at,
        ["--from", "initiatives/ambient-hud.md", "--to", "initiatives/amy/ambient-hud.md"],
        at.root
      )
      expect(run.code).toBe(1)
      expect(run.err).toContain(at.root)
      expect(existsSync(`${at.memory}/initiatives/ambient-hud.md`)).toBe(true)
    } finally {
      at.dispose()
    }
  })

  test("a repo no command addresses is refused by name rather than fallen back from", () => {
    const at = fixture()
    try {
      storeAt(at)
      const run = runMv(at, ["--repo", "memroy", ...INTO_A_FOLDER.slice(2)])
      expect(run.code).toBe(1)
      expect(run.err).toContain("memroy")
      expect(existsSync(`${at.memory}/initiatives/ambient-hud.md`)).toBe(true)
    } finally {
      at.dispose()
    }
  })
})
