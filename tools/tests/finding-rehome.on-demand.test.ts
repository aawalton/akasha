import { describe, expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { CLAIMED, fileKeyDeclared, fixture, type Fixture } from "./fixture.ts"

const ARM = `${import.meta.dir}/command-arm.ts`
const MODULE = `${import.meta.dir}/../commands/finding/rehome.ts`
const CLI = `${import.meta.dir}/../ops/cli.ts`
const AGENT = "finding-rehome-test"
const MOVING = "findings/finding/states-destination-twice.md"

function finding(domain: string, claim: string): string {
  return `---\ndomain-slug: ${domain}\n---\n\n# Claim\n\n${claim}\n\n# Evidence\n\nMeasured against the repo.\n`
}

function runCommand(at: Fixture, args: readonly string[]): { code: number; out: string; err: string } {
  const proc = Bun.spawnSync({
    cmd: ["bun", ARM, MODULE, ...args],
    cwd: at.memory,
    env: { ...process.env, AGENT_ID: AGENT, INSTRUCTIONS_ROOT: at.root, MEMORY_ROOT: at.memory, HOME: at.home },
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
  fileKeyDeclared(at)
  at.document(
    "pages/page-type/finding.page-type.md",
    `slug: finding\ndomain-parent-slug: global\nextends-slug: none\nfiles: memory:findings/**/*.md\n${CLAIMED}: memory:findings/role/states-destination-twice.md`
  )
  at.document("pages/page-type/role.page-type.md", "slug: role\ndomain-parent-slug: global", 20)
  at.document(
    "pages/domain/global.domain.md",
    `slug: global\ndomain-parent-slug: global\n${CLAIMED}: memory:findings/role/report-route-absent.md`,
    20
  )
  at.readIt(AGENT, "pages/page-type/finding.page-type.md")
  at.readIt(AGENT, "pages/domain/global.domain.md")
  at.putMemory(MOVING, finding("finding", "The store states its destination twice."))
  at.putMemory(
    "findings/role/report-route-absent.md",
    finding("role", `A worker has no route back, as \`${MOVING}\` also shows.`)
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
      const run = runCommand(at, ["--file-path", MOVING, "--domain", "roel"])
      expect(run.code).toBe(1)
      expect(run.err).toContain("roel")
      expect(existsSync(`${at.memory}/${MOVING}`)).toBe(true)
      expect(git(at.memory, ["status", "--porcelain"])).toBe("")
    } finally {
      at.dispose()
    }
  })

  test("a path that is not a finding is refused rather than moved under `findings/`", () => {
    const at = fixture()
    try {
      storeAt(at)
      const run = runCommand(at, ["--file-path", "pages/page-type/role.page-type.md", "--domain", "finding"])
      expect(run.code).toBe(1)
      expect(run.err).toContain("findings/")
      expect(git(at.memory, ["status", "--porcelain"])).toBe("")
    } finally {
      at.dispose()
    }
  })

  test("a finding two folders deep is refused, since no folder below a domain is decided", () => {
    const at = fixture()
    try {
      storeAt(at)
      at.putMemory("findings/role/cluster/deep-claim.md", finding("role", "It sits a folder too far down."))
      const run = runCommand(at, ["--file-path", "findings/role/cluster/deep-claim.md", "--domain", "role"])
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
      const run = runCommand(at, ["--file-path", MOVING, "--domain", "finding"])
      expect(run.code).toBe(1)
      expect(run.err).toContain("asks for no rehome")
      expect(git(at.memory, ["status", "--porcelain"])).toBe("")
    } finally {
      at.dispose()
    }
  })

  test("a path landing in another repository is refused, naming the one it landed in", () => {
    const at = fixture()
    try {
      storeAt(at)
      const run = runCommand(at, ["--file-path", `${at.root}/pages/page-type/role.page-type.md`, "--domain", "role"])
      expect(run.code).toBe(1)
      expect(run.err).toContain("instructions")
      expect(git(at.memory, ["status", "--porcelain"])).toBe("")
    } finally {
      at.dispose()
    }
  })
})

describe("what a rehome lands", () => {
  test("the folder and the key move together, in one commit, with the citation repointed", () => {
    const at = fixture()
    try {
      storeAt(at)
      const before = commitsIn(at.memory)
      runCommand(at, ["--file-path", MOVING, "--domain", "role"])
      const landed = `${at.memory}/findings/role/states-destination-twice.md`
      expect(existsSync(landed)).toBe(true)
      expect(existsSync(`${at.memory}/${MOVING}`)).toBe(false)
      expect(readFileSync(landed, "utf8")).toContain("domain-slug: role")
      expect(readFileSync(`${at.memory}/findings/role/report-route-absent.md`, "utf8")).toContain(
        "`findings/role/states-destination-twice.md`"
      )
      expect(commitsIn(at.memory)).toBe(before + 1)
      expect(git(at.memory, ["status", "--porcelain"])).toBe("")
    } finally {
      at.dispose()
    }
  })

  test("the commit names the repo it landed in rather than the instructions one", () => {
    const at = fixture()
    try {
      storeAt(at)
      runCommand(at, ["--file-path", MOVING, "--domain", "role"])
      expect(git(at.memory, ["log", "-1", "--format=%s"]).trim()).toStartWith("memory:")
    } finally {
      at.dispose()
    }
  })
})
