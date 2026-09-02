/**
 * What a commit attempt does to a shared worktree, asked of git rather than reasoned about.
 *
 * Every test here builds a throwaway repository and runs real `git`, because every fault this file
 * covers was a belief about git that turned out to be wrong when measured. The landing's undo is the
 * one path that has to work while something else has already failed, so the cases below are the
 * states the undo actually meets: paths HEAD no longer holds, paths it still holds, and a mix.
 */

import { afterEach, describe, expect, test } from "bun:test"
import { execFileSync } from "node:child_process"
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { committed, headHere, putBack, takenAway, untrackedAmong } from "./take-away.ts"

const built: string[] = []

afterEach(() => {
  for (const one of built) rmSync(one, { recursive: true, force: true })
  built.length = 0
})

function git(at: string, ...args: readonly string[]): string {
  return execFileSync("git", args, { cwd: at, encoding: "utf8" })
}

/** A repository holding a small corpus and a funnel, which is the shape the landing acts on. */
function repoWithCorpus(names: readonly string[]): { at: string; corpus: string; funnel: string } {
  const at = mkdtempSync(join(tmpdir(), "take-away-"))
  built.push(at)
  const hooks = join(at, "no-hooks")
  mkdirSync(hooks, { recursive: true })
  git(at, "init", "-q", ".")
  git(at, "config", "user.email", "landing@example.invalid")
  git(at, "config", "user.name", "landing")
  git(at, "config", "commit.gpgsign", "false")
  git(at, "config", "core.hooksPath", hooks)
  const corpus = join(at, "pages", "corpus")
  mkdirSync(corpus, { recursive: true })
  const funnel = join(at, "funnel.ts")
  writeFileSync(funnel, "MIGRATED_DAYS = []\n")
  for (const name of names) writeFileSync(join(corpus, name), `${name} body\n`)
  const paths = [...names.map((one) => `pages/corpus/${one}`), "funnel.ts"]
  git(at, "add", "--", ...paths)
  git(at, "commit", "-q", "-m", "the corpus stands", "--", ...paths)
  return { at, corpus, funnel }
}

/**
 * The snapshot the landing restores from, kept outside the worktree.
 *
 * Where it stood inside it, `git status` reported it and these tests measured their own scaffolding
 * rather than the corpus. The real landing keeps it in a work directory beside the checkout for the
 * same reason.
 */
function heldOutside(corpus: string, names: readonly string[]): string {
  const at = mkdtempSync(join(tmpdir(), "take-away-snapshot-"))
  built.push(at)
  for (const one of names) writeFileSync(join(at, one), readFileSync(join(corpus, one)))
  return at
}

function statusOf(at: string): readonly string[] {
  return git(at, "status", "--porcelain")
    .split("\n")
    .filter((one) => one !== "")
}

/** What a bare `git commit` by another lane would carry off — the sweep CLAUDE.md warns about. */
function stagedIn(at: string): readonly string[] {
  return git(at, "diff", "--cached", "--name-only")
    .split("\n")
    .filter((one) => one !== "")
}

const NAMES = ["a.md", "b.md", "c.md"] as const

describe("the take-away commit", () => {
  test("records the corpus going and the funnel turning as one", () => {
    const { at, corpus, funnel } = repoWithCorpus(NAMES)
    const was = headHere(at)
    expect(takenAway(corpus, NAMES).ok).toBe(true)
    writeFileSync(funnel, "MIGRATED_DAYS = ['a', 'b', 'c']\n")

    const said = committed(at, [...NAMES.map((one) => join(corpus, one)), funnel], "taken away")

    expect(said.ok).toBe(true)
    expect(said.moved).toBe(true)
    expect(headHere(at)).not.toBe(was)
    expect(git(at, "ls-files", "pages/corpus").trim()).toBe("")
    expect(statusOf(at)).toEqual([])
  })

  test("refuses where git reports no change at a named path, rather than committing around it", () => {
    const { at, corpus, funnel } = repoWithCorpus(NAMES)
    // Another lane staged a file and never committed it, so HEAD does not hold it. A take-away that
    // deletes it leaves git reporting nothing, and the landing's claim comes out false for that file.
    writeFileSync(join(corpus, "stray.md"), "stray body\n")
    git(at, "add", "--", "pages/corpus/stray.md")
    const was = headHere(at)
    expect(takenAway(corpus, [...NAMES, "stray.md"]).ok).toBe(true)
    writeFileSync(funnel, "MIGRATED_DAYS = ['a', 'b', 'c']\n")

    const said = committed(
      at,
      [...[...NAMES, "stray.md"].map((one) => join(corpus, one)), funnel],
      "taken away"
    )

    expect(said.ok).toBe(false)
    expect(said.moved).toBe(false)
    expect(headHere(at)).toBe(was)
    if (!said.ok) expect(said.why).toContain("stray.md")
  })
})

describe("the undo's restore commit", () => {
  test("records files HEAD no longer holds, which is what printed STUCK", () => {
    const { at, corpus, funnel } = repoWithCorpus(NAMES)
    const snapshot = heldOutside(corpus, NAMES)
    const wasFunnel = readFileSync(funnel, "utf8")
    const paths = [...NAMES.map((one) => join(corpus, one)), funnel]

    expect(takenAway(corpus, NAMES).ok).toBe(true)
    writeFileSync(funnel, "MIGRATED_DAYS = ['a', 'b', 'c']\n")
    expect(committed(at, paths, "taken away").ok).toBe(true)

    // Step 9 refuses here. Every restored file is untracked, because HEAD is the take-away commit.
    expect(putBack(corpus, snapshot, NAMES).ok).toBe(true)
    writeFileSync(funnel, wasFunnel)
    const said = committed(at, paths, "put back")

    expect(said.ok).toBe(true)
    expect(said.moved).toBe(true)
    expect(statusOf(at)).toEqual([])
    expect(git(at, "ls-files", "pages/corpus").split("\n").filter((one) => one !== "")).toHaveLength(
      NAMES.length
    )
    for (const one of NAMES) {
      expect(readFileSync(join(corpus, one), "utf8")).toBe(`${one} body\n`)
    }
    expect(readFileSync(funnel, "utf8")).toBe(wasFunnel)
  })

  test("leaves nothing staged for another lane's commit to sweep up", () => {
    const { at, corpus, funnel } = repoWithCorpus(NAMES)
    const snapshot = heldOutside(corpus, NAMES)
    const paths = [...NAMES.map((one) => join(corpus, one)), funnel]

    takenAway(corpus, NAMES)
    writeFileSync(funnel, "MIGRATED_DAYS = ['a', 'b', 'c']\n")
    committed(at, paths, "taken away")
    putBack(corpus, snapshot, NAMES)
    writeFileSync(funnel, "MIGRATED_DAYS = []\n")
    committed(at, paths, "put back")

    expect(stagedIn(at)).toEqual([])
  })

  test("calls a world with nothing to record done rather than stuck", () => {
    const { at, corpus, funnel } = repoWithCorpus(NAMES)
    const snapshot = heldOutside(corpus, NAMES)
    const paths = [...NAMES.map((one) => join(corpus, one)), funnel]

    // The take-away commit failed, so HEAD still holds the corpus, but a neighbouring lane moved
    // HEAD anyway. The restore puts back what was never removed and git sees nothing to record.
    expect(takenAway(corpus, NAMES).ok).toBe(true)
    expect(putBack(corpus, snapshot, NAMES).ok).toBe(true)

    const said = committed(at, paths, "put back")

    expect(said.ok).toBe(true)
    expect(said.moved).toBe(false)
    expect(statusOf(at)).toEqual([])
  })
})

describe("what git tracks", () => {
  test("untrackedAmong asks HEAD, so a file another lane only staged is still untracked", () => {
    const { at, corpus } = repoWithCorpus(NAMES)
    writeFileSync(join(corpus, "stray.md"), "stray body\n")
    git(at, "add", "--", "pages/corpus/stray.md")

    expect(untrackedAmong(at, corpus, [...NAMES, "stray.md"])).toEqual(["stray.md"])
  })

  test("putBack makes the corpus directory again when the undo finds it gone", () => {
    const { at, corpus } = repoWithCorpus(NAMES)
    const snapshot = heldOutside(corpus, NAMES)
    rmSync(corpus, { recursive: true, force: true })

    expect(putBack(corpus, snapshot, NAMES).ok).toBe(true)
    expect(existsSync(join(corpus, "a.md"))).toBe(true)
  })
})
