import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { tmpdir } from "node:os"
import { installRepos } from "./fixture.ts"

const COMMAND = `${import.meta.dir}/../rename-token.ts`

const HERE = resolve(import.meta.dir, "..", "..")

const KEPT = `export type Held = { readonly at: number }
export const SPELLED = "Held is a word here and nothing more"
`

const USES = `import type { Held } from "./kept.ts"

export function take(one: Held): number {
  return one.at
}
`

const APART = `type Held = { readonly other: boolean }

export function apart(one: Held): boolean {
  return one.other
}
`

let root: string
let home: string

function put(relPath: string, body: string): void {
  mkdirSync(dirname(`${root}/${relPath}`), { recursive: true })
  writeFileSync(`${root}/${relPath}`, body, "utf8")
}

function run(...argv: readonly string[]): { readonly code: number; readonly said: string } {
  const done = Bun.spawnSync({
    cmd: [process.execPath, COMMAND, ...argv, "--dry-run"],
    env: { ...process.env, HOME: home, AKASHA_ROOT: root, CODE_ROOT: HERE },
    stdout: "pipe",
    stderr: "pipe",
  })
  return { code: done.exitCode ?? 0, said: `${done.stderr.toString()}${done.stdout.toString()}` }
}

beforeEach(() => {
  root = mkdtempSync(`${tmpdir()}/rename-token-root-`)
  home = mkdtempSync(`${tmpdir()}/rename-token-home-`)
  put("kept.ts", KEPT)
  put("uses.ts", USES)
  put("apart.ts", APART)
  installRepos(root)
  Bun.spawnSync(["git", "init", "-q"], { cwd: root })
  Bun.spawnSync(["git", "add", "-A"], { cwd: root })
})

afterEach(() => {
  rmSync(root, { recursive: true, force: true })
  rmSync(home, { recursive: true, force: true })
})

describe("a name declared twice", () => {
  test("refuses rather than guessing, and prints each declaration as a line --at takes back", () => {
    const answer = run("--old", "Held", "--new", "Bound")
    expect(answer.code).toBe(1)
    expect(answer.said).toContain("names 2 separate declarations")
    expect(answer.said).toContain("kept.ts:1")
    expect(answer.said).toContain("apart.ts:1")
  })

  test("takes the one --at names and leaves the other alone", () => {
    const answer = run("--old", "Held", "--new", "Bound", "--at", "kept.ts:1")
    expect(answer.said).toContain("rename: 2 file(s), 3 reference(s) to Held")
    expect(answer.said).toContain("kept.ts  1")
    expect(answer.said).toContain("uses.ts  2")
    expect(answer.said).not.toContain("apart.ts  ")
  })

  test("refuses an --at that names no declaration", () => {
    const answer = run("--old", "Held", "--new", "Bound", "--at", "kept.ts:9")
    expect(answer.code).toBe(1)
    expect(answer.said).toContain("names no declaration of Held")
  })
})

describe("a spelling the compiler resolves to nothing", () => {
  test("is reported as left alone rather than rewritten", () => {
    const answer = run("--old", "Held", "--new", "Bound", "--at", "kept.ts:1")
    expect(answer.said).toContain("left alone: 1 spelling(s) of Held")
    expect(answer.said).toContain("`replace.ts` is the command for those")
  })
})

describe("what it refuses before resolving anything", () => {
  test("a --new that is not a legal identifier", () => {
    const answer = run("--old", "Held", "--new", "2Bound")
    expect(answer.code).toBe(1)
    expect(answer.said).toContain("is not a legal TypeScript identifier")
  })

  test("a name nothing in the repo spells", () => {
    const answer = run("--old", "Nowhere", "--new", "Bound")
    expect(answer.code).toBe(1)
    expect(answer.said).toContain("spells Nowhere")
  })
})
