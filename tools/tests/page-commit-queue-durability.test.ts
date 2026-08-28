import { afterAll, beforeEach, describe, expect, it } from "bun:test"
import { chmodSync, existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const journals = mkdtempSync(join("/var/tmp", "page-landing-journal-"))
process.env.PAGE_LANDING_JOURNAL_DIR = journals

const { git } = await import("../../repo/git/git.ts")
const {
  deferCommits,
  drainCommits,
  forgetCommits,
  landingsHealthy,
  recoverLandings,
  SPLIT_ATTEMPTS,
  STALL_ATTEMPTS,
  standing,
} = await import("../lib/page-commit-queue.ts")
const { readJournals, writeJournal } = await import("../lib/page-landing-journal.ts")
const { removePage, writePage } = await import("../lib/page-write.ts")
type Roots = import("../../page/page.ts").Roots

const page = (lines: readonly string[]): string => `---\n${lines.join("\n")}\n---\n`

const root = mkdtempSync(join("/var/tmp", "page-landing-durability-"))

mkdirSync(join(root, "pages/page-type"), { recursive: true })
mkdirSync(join(root, "pages/page-property-definition"), { recursive: true })
mkdirSync(join(root, "pages/probe"), { recursive: true })
writeFileSync(
  join(root, "pages/page-type/probe.page-type.md"),
  page(["extends-slug: none"])
)
writeFileSync(
  join(root, "pages/page-property-definition/probe-title.page-property-definition.md"),
  page(["defined-on-slug: probe", "key: title", "type: text"])
)
writeFileSync(join(root, ".gitignore"), "*.uncommitted.yaml\n")

git(root, ["init", "--initial-branch", "main"])
git(root, ["config", "user.email", "probe@example.invalid"])
git(root, ["config", "user.name", "Probe"])
git(root, ["add", "-A"])
git(root, ["commit", "-m", "the tree these tests start from"])

const LOCK = join(root, ".git", "harness-landing.lock")

const NO_SUCH_PID = 2147483647

const ROOTS: Roots = {
  akasha: root,
}

const commits = (): number => Number(git(root, ["rev-list", "--count", "HEAD"]).stdout)

const named = (): readonly string[] =>
  git(root, ["show", "--name-only", "--format=", "HEAD"]).stdout
    .split("\n")
    .filter((one) => one !== "")

let holder: ReturnType<typeof Bun.spawn> | null = null

function holdLandingLive(): void {
  holder = Bun.spawn(["sleep", "120"], { stdout: "ignore", stderr: "ignore" })
  writeFileSync(LOCK, `${holder.pid}\n`)
}

function releaseLanding(): void {
  if (holder !== null) {
    holder.kill()
    holder = null
  }
  rmSync(LOCK, { force: true })
}

beforeEach(() => {
  releaseLanding()
  forgetCommits()
  deferCommits()
})

afterAll(() => {
  releaseLanding()
  forgetCommits()
  rmSync(root, { recursive: true, force: true })
  rmSync(journals, { recursive: true, force: true })
})

describe("a landing the queue has taken on", () => {
  it("is never dropped, however many attempts a live lock holder costs it", () => {
    const was = commits()
    holdLandingLive()
    writePage(ROOTS, "probe", "held", { title: "Held" }, "delegate-one")
    expect(existsSync(join(root, "pages/probe/held.probe.md"))).toBe(true)
    expect(standing().unlanded).toBe(1)

    drainCommits(STALL_ATTEMPTS + 2, 10)
    expect(commits()).toBe(was)

    const stalled = standing()
    expect(stalled.pending).toBe(1)
    expect(stalled.unlanded).toBe(1)
    expect(stalled.stalled).toContain(root)
    expect(stalled.lastError).toContain("STALLED")
    expect(landingsHealthy(stalled)).toBe(false)

    releaseLanding()
    drainCommits()
    expect(commits()).toBe(was + 1)
    expect(named()).toEqual(["pages/probe/held.probe.md"])
    const settled = standing()
    expect(settled.unlanded).toBe(0)
    expect(settled.lastError).toBeNull()
    expect(landingsHealthy(settled)).toBe(true)
  })

  it("stands in a durable record from the moment its file lands, before any commit", () => {
    writePage(ROOTS, "probe", "recorded", { title: "Recorded" }, "delegate-two")
    const held = readJournals()
    expect(held).toHaveLength(1)
    expect(Object.keys(held[0]?.paths ?? {})).toEqual(["pages/probe/recorded.probe.md"])
    expect(held[0]?.paths["pages/probe/recorded.probe.md"]?.act).toContain("delegate-two")
    drainCommits()
    expect(readJournals()).toHaveLength(0)
  })

  it("is picked up by the next process where the one that queued it died first", () => {
    const was = commits()
    writePage(ROOTS, "probe", "orphan", { title: "Orphan" }, "delegate-three")
    const before = readJournals()[0]
    expect(before).toBeDefined()

    forgetCommits()
    expect(standing().pending).toBe(0)
    writeJournal({
      ...(before as NonNullable<typeof before>),
      pid: NO_SUCH_PID,
      attempts: STALL_ATTEMPTS,
      reason: "another writer held the landing lock",
    })

    const orphaned = standing()
    expect(orphaned.unlanded).toBe(1)
    expect(orphaned.stalled).toContain(root)
    expect(landingsHealthy(orphaned)).toBe(false)

    expect(recoverLandings()).toEqual([`${root}/pages/probe/orphan.probe.md`])
    const carried = standing()
    expect(carried.stalled).toContain(root)
    expect(carried.lastError).toContain("another writer held the landing lock")

    drainCommits()
    expect(commits()).toBe(was + 1)
    expect(named()).toEqual(["pages/probe/orphan.probe.md"])
    expect(standing().unlanded).toBe(0)
  })

  it("is reported by `tools/unlanded.ts`, which reads the record rather than git status", async () => {
    writePage(ROOTS, "probe", "listed", { title: "Listed" }, "delegate-four")
    const ran = Bun.spawnSync(
      [process.execPath, join(import.meta.dir, "../unlanded.ts"), "--json"],
      { env: { ...process.env, PAGE_LANDING_JOURNAL_DIR: journals } }
    )
    const said = JSON.parse(new TextDecoder().decode(ran.stdout)) as {
      files: readonly { root: string; path: string; act: string; state: string }[]
    }
    expect(ran.exitCode).toBe(1)
    expect(said.files).toHaveLength(1)
    expect(said.files[0]?.path).toBe("pages/probe/listed.probe.md")
    expect(said.files[0]?.root).toBe(root)
    expect(said.files[0]?.act).toContain("delegate-four")
    drainCommits()
    await Promise.resolve()
  })

  it("lands at once behind a lock whose holder is dead, rather than waiting on it", () => {
    const was = commits()
    writeFileSync(LOCK, `${NO_SUCH_PID}\n`)
    writePage(ROOTS, "probe", "dead-holder", { title: "Dead holder" }, "delegate-five")
    drainCommits(1, 10)
    expect(commits()).toBe(was + 1)
    expect(standing().unlanded).toBe(0)
    expect(existsSync(LOCK)).toBe(false)
  })

  it("carries no path git never heard of, so a page written and removed holds nothing back", () => {
    const was = commits()
    writePage(ROOTS, "probe", "real", { title: "Real" }, "delegate-six")
    writePage(ROOTS, "probe", "fleeting", { title: "Fleeting" }, "delegate-six")
    removePage(ROOTS, "probe", "fleeting", "delegate-six")
    expect(existsSync(join(root, "pages/probe/fleeting.probe.md"))).toBe(false)
    expect(standing().unlanded).toBe(2)

    drainCommits()
    expect(commits()).toBe(was + 1)
    expect(named()).toEqual(["pages/probe/real.probe.md"])
    expect(standing().unlanded).toBe(0)
  })

  it("lets a path that cannot land hold only itself, never the batch it rode in", () => {
    const hook = join(root, ".git", "hooks", "pre-commit")
    writeFileSync(
      hook,
      "#!/bin/sh\ngit diff --cached --name-only | grep -q '^pages/probe/cursed\\.probe\\.md$' && exit 1\nexit 0\n"
    )
    chmodSync(hook, 0o755)
    try {
      const was = commits()
      writePage(ROOTS, "probe", "rider", { title: "Rider" }, "delegate-seven")
      writePage(ROOTS, "probe", "cursed", { title: "Cursed" }, "delegate-seven")
      expect(standing().unlanded).toBe(2)

      drainCommits(SPLIT_ATTEMPTS + 1, 10)
      expect(commits()).toBe(was + 1)
      expect(named()).toEqual(["pages/probe/rider.probe.md"])
      const left = standing()
      expect(left.unlanded).toBe(1)
      expect(left.lastError).toContain("pages/probe/cursed.probe.md")
    } finally {
      rmSync(hook, { force: true })
    }
  })

  it("still folds a window of writes into one commit per repo", () => {
    const was = commits()
    for (const name of ["p", "q", "r", "s"]) {
      writePage(ROOTS, "probe", name, { title: name.toUpperCase() }, "sweeper")
    }
    expect(commits()).toBe(was)
    expect(standing().unlanded).toBe(4)
    drainCommits()
    expect(commits()).toBe(was + 1)
    expect([...named()].sort()).toEqual([
      "pages/probe/p.probe.md",
      "pages/probe/q.probe.md",
      "pages/probe/r.probe.md",
      "pages/probe/s.probe.md",
    ])
    expect(standing().unlanded).toBe(0)
  })
})
