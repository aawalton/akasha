import { afterAll, beforeEach, describe, expect, it } from "bun:test"
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { git } from "../../repo/git/git.ts"
import { drainCommits, forgetCommits, standing } from "../lib/page-commit-queue.ts"
import { deferCommits } from "../lib/page-commit-queue.ts"
import { patchPage, removePage, writePage } from "../lib/page-write.ts"
import type { Roots } from "../../page/page.ts"

const page = (lines: readonly string[]): string => `---\n${lines.join("\n")}\n---\n`

const FILES: Readonly<Record<string, string>> = {
  "pages/page-type/probe.page-type.md": page(["extends-slug: none"]),
  "pages/page-property-definition/probe-beat.page-property-definition.md": page([
    "defined-on-slug: probe",
    "key: beat",
    "type: instant",
    "uncommitted: true",
  ]),
  "pages/page-property-definition/probe-title.page-property-definition.md": page(["defined-on-slug: probe", "key: title", "type: text"]),
}

const root = mkdtempSync(join("/var/tmp", "page-write-deferred-"))

for (const [relPath, text] of Object.entries(FILES)) {
  mkdirSync(join(root, relPath, ".."), { recursive: true })
  writeFileSync(join(root, relPath), text)
}
mkdirSync(join(root, "pages/probe"), { recursive: true })
writeFileSync(join(root, ".gitignore"), "*.uncommitted.yaml\n*.lock/\n")

git(root, ["init", "--initial-branch", "main"])
git(root, ["config", "user.email", "probe@example.invalid"])
git(root, ["config", "user.name", "Probe"])
git(root, ["add", "-A"])
git(root, ["commit", "-m", "the tree these tests start from"])

afterAll(() => {
  forgetCommits()
  rmSync(root, { recursive: true, force: true })
})

const ROOTS: Roots = {
  akasha: root,
}

const commits = (): number => Number(git(root, ["rev-list", "--count", "HEAD"]).stdout)

const subject = (): string => git(root, ["log", "-1", "--format=%s"]).stdout

const named = (): readonly string[] =>
  git(root, ["show", "--name-only", "--format=", "HEAD"]).stdout.split("\n").filter((one) => one !== "")

const read = (relPath: string): string => readFileSync(join(root, relPath), "utf8")

beforeEach(() => {
  forgetCommits()
  deferCommits()
})

describe("a write the service defers", () => {
  it("lands the file at once and commits nothing until the queue drains", () => {
    const was = commits()
    writePage(ROOTS, "probe", "one", { title: "One" }, "tester")
    expect(existsSync(join(root, "pages/probe/one.probe.md"))).toBe(true)
    expect(commits()).toBe(was)
    expect(standing().pending).toBe(1)
    drainCommits()
    expect(commits()).toBe(was + 1)
    expect(standing().pending).toBe(0)
  })

  it("folds many writes into ONE commit rather than one commit per page", () => {
    const was = commits()
    for (const name of ["a", "b", "c", "d"]) {
      writePage(ROOTS, "probe", name, { title: name.toUpperCase() }, "sweeper")
    }
    writePage(ROOTS, "probe", "e", { title: "E" }, "other")
    expect(commits()).toBe(was)
    drainCommits()
    expect(commits()).toBe(was + 1)
    expect([...named()].sort()).toEqual([
      "pages/probe/a.probe.md",
      "pages/probe/b.probe.md",
      "pages/probe/c.probe.md",
      "pages/probe/d.probe.md",
      "pages/probe/e.probe.md",
    ])
    expect(subject()).toContain("sweeper")
    expect(subject()).toContain("other")
  })

  it("counts a page written twice before the drain once, and commits it once", () => {
    const was = commits()
    writePage(ROOTS, "probe", "twice", { title: "first" }, "tester")
    writePage(ROOTS, "probe", "twice", { title: "second" }, "tester")
    drainCommits()
    expect(commits()).toBe(was + 1)
    expect(named()).toEqual(["pages/probe/twice.probe.md"])
    expect(read("pages/probe/twice.probe.md")).toContain("title: second")
  })
})

describe("a value its property declares uncommitted", () => {
  it("stands beside the page rather than in the frontmatter a commit records", () => {
    writePage(ROOTS, "probe", "beating", { title: "Beating", beat: "2026-08-19T10:00:00Z" }, "tester")
    expect(read("pages/probe/beating.probe.md")).not.toContain("beat:")
    expect(read("pages/probe/beating.probe.uncommitted.yaml")).toContain("2026-08-19T10:00:00Z")
    drainCommits()
    expect(named()).toEqual(["pages/probe/beating.probe.md"])
  })

  it("costs no commit at all where it is the only thing a patch carries", () => {
    writePage(ROOTS, "probe", "quiet", { title: "Quiet" }, "tester")
    drainCommits()
    const was = commits()
    for (let n = 0; n < 20; n += 1) {
      patchPage(ROOTS, "probe", "quiet", { beat: `tick-${n}` }, "heartbeat")
    }
    expect(standing().pending).toBe(0)
    drainCommits()
    expect(commits()).toBe(was)
    expect(read("pages/probe/quiet.probe.uncommitted.yaml")).toContain("tick-19")
  })

  it("is taken out of a frontmatter that already held it, so no stale copy stands", () => {
    mkdirSync(join(root, "pages/probe"), { recursive: true })
    writeFileSync(
      join(root, "pages/probe/stale.probe.md"),
      page(["page-type-slug: probe", "title: Stale", "beat: old"])
    )
    patchPage(ROOTS, "probe", "stale", { title: "Fresh" }, "tester")
    expect(read("pages/probe/stale.probe.md")).not.toContain("beat:")
    expect(read("pages/probe/stale.probe.md")).toContain("title: Fresh")
    drainCommits()
  })

  it("goes when its page goes", () => {
    writePage(ROOTS, "probe", "gone", { title: "Gone", beat: "now" }, "tester")
    drainCommits()
    expect(existsSync(join(root, "pages/probe/gone.probe.uncommitted.yaml"))).toBe(true)
    removePage(ROOTS, "probe", "gone", "tester")
    expect(existsSync(join(root, "pages/probe/gone.probe.uncommitted.yaml"))).toBe(false)
    expect(existsSync(join(root, "pages/probe/gone.probe.md"))).toBe(false)
    drainCommits()
    expect(named()).toEqual(["pages/probe/gone.probe.md"])
  })
})

describe("a write that changes nothing", () => {
  it("queues no commit, so a worker rewriting the same values costs nothing", () => {
    writePage(ROOTS, "probe", "same", { title: "Same" }, "tester")
    drainCommits()
    const was = commits()
    for (let n = 0; n < 5; n += 1) {
      writePage(ROOTS, "probe", "same", { title: "Same" }, "tester")
    }
    expect(standing().pending).toBe(0)
    drainCommits()
    expect(commits()).toBe(was)
  })

  it("queues no commit where the page it would remove is not there", () => {
    removePage(ROOTS, "probe", "never-was", "tester")
    expect(standing().pending).toBe(0)
  })
})

describe("a patch that carries both kinds at once", () => {
  it("splits them without the writer being told which is which", () => {
    writePage(ROOTS, "probe", "both", { title: "Both" }, "tester")
    drainCommits()
    const was = commits()
    patchPage(ROOTS, "probe", "both", { title: "Both again", beat: "later" }, "tester")
    expect(read("pages/probe/both.probe.md")).toContain("title: Both again")
    expect(read("pages/probe/both.probe.md")).not.toContain("later")
    expect(read("pages/probe/both.probe.uncommitted.yaml")).toContain("later")
    drainCommits()
    expect(commits()).toBe(was + 1)
  })
})
