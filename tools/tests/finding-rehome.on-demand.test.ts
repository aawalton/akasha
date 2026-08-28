import { describe, expect, test } from "bun:test"
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { CLAIMED, fileKeyDeclared, fixture, installRepos, type Fixture } from "./fixture.ts"

const ARM = `${import.meta.dir}/command-arm.ts`
const MODULE = `${import.meta.dir}/../commands/finding/rehome.ts`
const INDEX = `${import.meta.dir}/../commands/index/refresh.ts`
const CLI = `${import.meta.dir}/../ops/cli.ts`
const LIVE = `${import.meta.dir}/../..`
const AGENT = "finding-rehome-test"
const MOVING = "pages/finding/finding/states-destination-twice.finding.md"
const CITING = "pages/finding/role/report-route-absent.finding.md"

function finding(domain: string, claim: string): string {
  return `---\ndomain-slug: ${domain}\n---\n\n# Claim\n\n${claim}\n\n# Evidence\n\nMeasured against the repo.\n`
}

function runCommand(
  at: Fixture,
  args: readonly string[],
  also: Record<string, string> = {},
  module: string = MODULE
): { code: number; out: string; err: string } {
  const proc = Bun.spawnSync({
    cmd: ["bun", ARM, module, ...args],
    cwd: at.root,
    // ONE ROOT NAMES THE STORE, AND `CODE_ROOT` NAMES THE PACKAGES. The temp store carries no
    // `node_modules`, so the `@shared/...` the command loads is looked for in this checkout.
    env: { ...process.env, AGENT_ID: AGENT, AKASHA_ROOT: at.root, CODE_ROOT: LIVE, HOME: at.home, ...also },
    stdout: "pipe",
    stderr: "pipe",
  })
  return { code: proc.exitCode ?? -1, out: proc.stdout.toString(), err: proc.stderr.toString() }
}

function git(cwd: string, args: readonly string[]): string {
  return Bun.spawnSync({ cmd: ["git", ...args], cwd, stdout: "pipe", stderr: "pipe" }).stdout.toString()
}

function commitsIn(root: string): number {
  return Number(git(root, ["rev-list", "--count", "HEAD"]).trim())
}

function storeAt(at: Fixture): void {
  at.installRecorder()
  installRepos(at.root)
  fileKeyDeclared(at)
  at.document(
    "pages/page-type/finding.page-type.md",
    `slug: finding\ndomain-parent-slug: global\nextends-slug: none\nfiles: akasha:**/*.finding.md\n${CLAIMED}: akasha:pages/finding/role/states-destination-twice.finding.md`
  )
  at.document("pages/page-type/role.page-type.md", "slug: role\ndomain-parent-slug: global", 20)
  at.document(
    "pages/domain/global.domain.md",
    `slug: global\ndomain-parent-slug: global\n${CLAIMED}: akasha:${CITING}`,
    20
  )
  at.readIt(AGENT, "pages/page-type/finding.page-type.md")
  at.readIt(AGENT, "pages/domain/global.domain.md")
  at.put(MOVING, finding("page-type/finding", "The store states its destination twice."))
  at.put(CITING, finding("page-type/role", `A worker has no route back, as \`${MOVING}\` also shows.`))
  for (const args of [
    ["init", "-q", "-b", "main"],
    ["config", "user.email", "test@example.com"],
    ["config", "user.name", "Test"],
    ["add", "-A"],
    ["commit", "-q", "-m", "seed"],
  ]) {
    git(at.root, args)
  }
  // A MOVE READS THE PAGE INDEX. The escaped-spelling survey a rehome runs scans `**/*.file-kind-
  // domain.md` through the index, and refuses outright where the index was never built over the
  // root — an empty answer being indistinguishable from a repository holding no page. The index
  // sits under the root's own `.git`, so it has to be written for each fixture.
  expect(runCommand(at, [], {}, INDEX).code).toBe(0)
}

describe("what a rehome refuses", () => {
  test("--help exits 0 and names every flag it takes", () => {
    const proc = Bun.spawnSync({ cmd: ["bun", CLI, "finding", "rehome", "--help"], stdout: "pipe" })
    expect(proc.exitCode).toBe(0)
    const help = proc.stdout.toString()
    for (const flag of ["--file-path", "--domain", "--dry-run"]) expect(help).toContain(flag)
    expect(help).not.toContain("--repo ")
  })

  test("a destination no document declares is refused, with nothing moved and nothing written", () => {
    const at = fixture()
    try {
      storeAt(at)
      const run = runCommand(at, ["--file-path", MOVING, "--domain", "page-type/roel"])
      expect(run.code).toBe(1)
      expect(run.err).toContain("roel")
      expect(existsSync(`${at.root}/${MOVING}`)).toBe(true)
      expect(git(at.root, ["status", "--porcelain"])).toBe("")
    } finally {
      at.dispose()
    }
  })

  test("a bare slug is refused rather than resolved, a key naming a page type as well", () => {
    const at = fixture()
    try {
      storeAt(at)
      const run = runCommand(at, ["--file-path", MOVING, "--domain", "role"])
      expect(run.code).toBe(1)
      expect(run.err).toContain("bare slug")
      expect(existsSync(`${at.root}/${MOVING}`)).toBe(true)
      expect(git(at.root, ["status", "--porcelain"])).toBe("")
    } finally {
      at.dispose()
    }
  })

  test("a path that is not a finding is refused rather than moved under the findings folder", () => {
    const at = fixture()
    try {
      storeAt(at)
      const run = runCommand(at, ["--file-path", "pages/page-type/role.page-type.md", "--domain", "page-type/finding"])
      expect(run.code).toBe(1)
      expect(run.err).toContain("pages/finding/")
      expect(git(at.root, ["status", "--porcelain"])).toBe("")
    } finally {
      at.dispose()
    }
  })

  test("a finding two folders deep is refused, since no folder below a domain is decided", () => {
    const at = fixture()
    try {
      storeAt(at)
      const deep = "pages/finding/role/cluster/deep-claim.finding.md"
      at.put(deep, finding("page-type/role", "It sits a folder too far down."))
      const run = runCommand(at, ["--file-path", deep, "--domain", "page-type/role"])
      expect(run.code).toBe(1)
      expect(run.err).toContain("does not name a finding")
    } finally {
      at.dispose()
    }
  })

  test("a finding already sitting under the domain it declares is refused, asking for no rehome", () => {
    const at = fixture()
    try {
      storeAt(at)
      const run = runCommand(at, ["--file-path", MOVING, "--domain", "page-type/finding"])
      expect(run.code).toBe(1)
      expect(run.err).toContain("asks for no rehome")
      expect(git(at.root, ["status", "--porcelain"])).toBe("")
    } finally {
      at.dispose()
    }
  })

  // A SECOND CHECKOUT, NOT A SECOND ROOT OF THE SAME ONE. `code-editor` is the repository beside
  // akasha, and a bare git directory named through its root variable is enough for a path to be
  // placed in it.
  test("a path landing in another repository is refused, naming the one it landed in", () => {
    const at = fixture()
    const beside = mkdtempSync(`${tmpdir()}/rehometest-beside-`)
    try {
      storeAt(at)
      mkdirSync(`${beside}/.git`, { recursive: true })
      const run = runCommand(at, ["--file-path", `${beside}/notes.md`, "--domain", "page-type/role"], {
        CODE_EDITOR_ROOT: beside,
      })
      expect(run.code).toBe(1)
      expect(run.err).toContain("code-editor")
      expect(git(at.root, ["status", "--porcelain"])).toBe("")
    } finally {
      rmSync(beside, { recursive: true, force: true })
      at.dispose()
    }
  })
})

describe("what a rehome lands", () => {
  test("the folder and the key move together, in one commit, with the citation repointed", () => {
    const at = fixture()
    try {
      storeAt(at)
      const before = commitsIn(at.root)
      runCommand(at, ["--file-path", MOVING, "--domain", "page-type/role"])
      const landed = `${at.root}/pages/finding/role/states-destination-twice.finding.md`
      expect(existsSync(landed)).toBe(true)
      expect(existsSync(`${at.root}/${MOVING}`)).toBe(false)
      expect(readFileSync(landed, "utf8")).toContain("domain-slug: page-type/role")
      expect(readFileSync(`${at.root}/${CITING}`, "utf8")).toContain(
        "`pages/finding/role/states-destination-twice.finding.md`"
      )
      expect(commitsIn(at.root)).toBe(before + 1)
      expect(git(at.root, ["status", "--porcelain"])).toBe("")
    } finally {
      at.dispose()
    }
  })

  test("the commit names the repository the finding stands in", () => {
    const at = fixture()
    try {
      storeAt(at)
      runCommand(at, ["--file-path", MOVING, "--domain", "page-type/role"])
      expect(git(at.root, ["log", "-1", "--format=%s"]).trim()).toStartWith("akasha:")
    } finally {
      at.dispose()
    }
  })
})
