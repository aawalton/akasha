import { describe, expect, test } from "bun:test"
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs"
import { composeFinding } from "../lib/finding.ts"
import { fixture, installPages, installRepos, type Fixture } from "./fixture.ts"

const ARM = `${import.meta.dir}/command-arm.ts`

const LIVE = `${import.meta.dir}/../..`

const MODULE = `${import.meta.dir}/../commands/finding/create.ts`

const CLI = `${import.meta.dir}/../ops/cli.ts`

const AGENT = "finding-create-test"

const PAGES = [
  "pages/page-type/page.page-type.md",
  "pages/page-type/finding.page-type.md",
  "pages/page-body-shape/finding.page-body-shape.md",
  "pages/page-property-definition/finding-domain-slug.page-property-definition.md",
  "pages/page-property-definition/page-type-slug.page-property-definition.md",
]

function storeAt(at: Fixture): void {
  mkdirSync(`${at.root}/pages/finding`, { recursive: true })
  at.installRecorder()
  installRepos(at.root)
  installPages(at.root, PAGES)
  at.readIt(AGENT, "pages/page-type/finding.page-type.md")
  at.readIt(AGENT, "pages/page-type/page.page-type.md")
  at.document("pages/domain/global.domain.md", "slug: global\ndomain-parent-slug: global", 20)
  writeFileSync(`${at.home}/claim.md`, "The store states its destination twice.\n")
  writeFileSync(`${at.home}/evidence.md`, "Measured against the repo at 2026-08-02.\n")
}

function runCommand(at: Fixture, args: readonly string[]): { code: number; out: string; err: string } {
  const proc = Bun.spawnSync({
    cmd: ["bun", ARM, MODULE, ...args],
    cwd: at.root,
    env: { ...process.env, AGENT_ID: AGENT, AKASHA_ROOT: at.root, CODE_ROOT: LIVE, HOME: at.home },
    stdout: "pipe",
    stderr: "pipe",
  })
  return { code: proc.exitCode ?? -1, out: proc.stdout.toString(), err: proc.stderr.toString() }
}

function filing(at: Fixture, domain: string, slug: string): readonly string[] {
  return [
    "--domain",
    domain,
    "--slug",
    slug,
    "--title",
    "The store states its destination twice",
    "--claim-file",
    `${at.home}/claim.md`,
    "--evidence-file",
    `${at.home}/evidence.md`,
  ]
}

describe("what the filing command refuses before it composes anything", () => {
  test("--help exits 0 and names every flag it takes", () => {
    const proc = Bun.spawnSync({ cmd: ["bun", CLI, "finding", "create", "--help"], stdout: "pipe" })
    expect(proc.exitCode).toBe(0)
    const help = proc.stdout.toString()
    for (const flag of ["--domain", "--slug", "--title", "--claim-file", "--evidence-file", "--dry-run"]) {
      expect(help).toContain(flag)
    }
    expect(help).not.toContain("--repo")
  })

  test("a domain no document declares is refused, and the nearest declared slugs are named", () => {
    const at = fixture()
    try {
      storeAt(at)
      const run = runCommand(at, filing(at, "page-type/findinsg", "states-destination-twice"))
      expect(run.code).toBe(1)
      expect(run.err).toContain("findinsg")
      expect(run.err).toContain("finding")
      expect(readdirSync(`${at.root}/pages/finding`)).toEqual([])
    } finally {
      at.dispose()
    }
  })

  test("a bare slug is refused rather than resolved, a key naming a page type as well", () => {
    const at = fixture()
    try {
      storeAt(at)
      const run = runCommand(at, filing(at, "finding", "states-destination-twice"))
      expect(run.code).toBe(1)
      expect(run.err).toContain("bare slug")
      expect(run.err).toContain("page-type/finding")
      expect(readdirSync(`${at.root}/pages/finding`)).toEqual([])
    } finally {
      at.dispose()
    }
  })

  test("a slug that is not kebab-case is refused, the store's names all being of that shape", () => {
    const at = fixture()
    try {
      storeAt(at)
      const run = runCommand(at, filing(at, "page-type/finding", "States Destination Twice"))
      expect(run.code).toBe(1)
      expect(run.err).toContain("kebab-case")
      expect(readdirSync(`${at.root}/pages/finding`)).toEqual([])
    } finally {
      at.dispose()
    }
  })

  test("a destination already taken is refused, since filing never overwrites a claim", () => {
    const at = fixture()
    try {
      storeAt(at)
      at.put(
        "pages/finding/taken.finding.md",
        "---\ndomain-slug: finding\n---\n\n# Claim\n\nx\n\n# Evidence\n\ny\n"
      )
      const run = runCommand(at, filing(at, "page-type/finding", "taken"))
      expect(run.code).toBe(1)
      expect(run.err).toContain("already")
      expect(readFileSync(`${at.root}/pages/finding/taken.finding.md`, "utf8")).toContain("# Claim")
    } finally {
      at.dispose()
    }
  })

  test("a missing required flag is refused rather than defaulted", () => {
    const at = fixture()
    try {
      storeAt(at)
      const run = runCommand(at, ["--domain", "page-type/finding", "--slug", "x", "--title", "x"])
      expect(run.code).toBe(1)
      expect(run.err).toContain("--claim-file")
    } finally {
      at.dispose()
    }
  })

  test("an argument it does not take is refused rather than ignored", () => {
    const at = fixture()
    try {
      storeAt(at)
      const run = runCommand(at, [...filing(at, "page-type/finding", "x"), "--cluster", "y"])
      expect(run.code).toBe(1)
      expect(run.err).toContain("--cluster")
    } finally {
      at.dispose()
    }
  })

  test("no flag names the repository, the page type saying which one holds a finding", () => {
    const at = fixture()
    try {
      storeAt(at)
      const run = runCommand(at, [...filing(at, "page-type/finding", "x"), "--repo", "memory"])
      expect(run.code).toBe(1)
      expect(run.err).toContain("--repo")
    } finally {
      at.dispose()
    }
  })
})

describe("what it puts through the gates", () => {
  test("a dry run prints the destination and writes nothing", () => {
    const at = fixture()
    try {
      storeAt(at)
      const run = runCommand(at, [...filing(at, "page-type/finding", "states-destination-twice"), "--dry-run"])
      expect(run.out).toContain("pages/finding/states-destination-twice.finding.md")
      expect(existsSync(`${at.root}/pages/finding/states-destination-twice.finding.md`)).toBe(false)
    } finally {
      at.dispose()
    }
  })

})

describe("what it lands", () => {
  test("the body carries the keys it was given, and one commit names the path", () => {
    const at = fixture()
    try {
      at.document(
        "pages/page-type/finding.page-type.md",
        `slug: finding\ndomain-parent-slug: global\nextends-slug: none\nfiles: akasha:**/*.finding.md`,
        20
      )
      at.document("pages/domain/global.domain.md", "slug: global\ndomain-parent-slug: global", 20)
      installRepos(at.root)
      installPages(at.root, ["pages/page-property-definition/page-type-slug.page-property-definition.md"])
      at.installRecorder()
      at.readIt(AGENT, "pages/page-type/finding.page-type.md")
      mkdirSync(`${at.root}/pages/finding`, { recursive: true })
      at.put(".keep", "")
      writeFileSync(`${at.home}/claim.md`, "The store states its destination twice.\n")
      writeFileSync(`${at.home}/evidence.md`, "Measured against the repo.\n")
      for (const args of [
        ["init", "-q", "-b", "main"],
        ["config", "user.email", "test@example.com"],
        ["config", "user.name", "Test"],
        ["add", "-A"],
        ["commit", "-q", "-m", "seed"],
      ]) {
        Bun.spawnSync({ cmd: ["git", ...args], cwd: at.root, stdout: "pipe", stderr: "pipe" })
      }
      runCommand(at, filing(at, "page-type/finding", "states-destination-twice"))

      const landed = "pages/finding/states-destination-twice.finding.md"
      const kept = readFileSync(`${at.root}/${landed}`, "utf8")
      expect(kept).toContain("domain-slug: page-type/finding")
      expect(kept).toContain("slug: states-destination-twice")
      const show = Bun.spawnSync({
        cmd: ["git", "show", "--stat", "--name-status", "HEAD"],
        cwd: at.root,
        stdout: "pipe",
      }).stdout.toString()
      expect(show).toContain(landed)
      const count = Bun.spawnSync({
        cmd: ["git", "rev-list", "--count", "HEAD", "^HEAD~1"],
        cwd: at.root,
        stdout: "pipe",
      }).stdout.toString()
      expect(count.trim()).toBe("1")
    } finally {
      at.dispose()
    }
  })
})

describe("what the composition is", () => {
  test("the domain, the slug and the title reach the keys and the prose reaches the two headings", () => {
    const body = composeFinding(
      "page-type/finding",
      "a-name-of-its-own",
      "  A title.  ",
      "  A claim.  ",
      "\nThe evidence.\n"
    )
    expect(body).toBe(
      '---\npage-type-slug: finding\nslug: a-name-of-its-own\ntitle: "A title."\ndomain-slug: page-type/finding\n---\n\n# Claim\n\nA claim.\n\n# Evidence\n\nThe evidence.\n'
    )
  })
})
