import { afterAll, describe, expect, it } from "bun:test"
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { git } from "../../repo/git/git.ts"
import { drainCommits } from "../lib/page-commit-queue.ts"
import { removePage, whereFor, writePage } from "../lib/page-write.ts"
import type { Roots } from "../../page/page"

const page = (lines: readonly string[]): string => `---\n${lines.join("\n")}\n---\n`

function repoAt(prefix: string): string {
  const root = mkdtempSync(join("/var/tmp", prefix))
  writeFileSync(join(root, ".gitignore"), "*.uncommitted.yaml\n*.lock/\n")
  git(root, ["init", "--initial-branch", "main"])
  git(root, ["config", "user.email", "probe@example.invalid"])
  git(root, ["config", "user.name", "Probe"])
  git(root, ["add", "-A"])
  git(root, ["commit", "-m", "the tree these tests start from"])
  return root
}

const here = repoAt("page-write-filed-here-")
const elsewhere = repoAt("page-write-filed-elsewhere-")

const FILES: Readonly<Record<string, string>> = {
  "pages/page-type/probe.page-type.md": page([
    "extends-slug: none",
    "files: memory:**/*.probe.md",
  ]),
  "pages/page-property-definition/probe-title.page-property-definition.md": page([
    "defined-on-slug: probe",
    "key: title",
    "type: text",
  ]),
}

for (const [relPath, text] of Object.entries(FILES)) {
  mkdirSync(join(here, relPath, ".."), { recursive: true })
  writeFileSync(join(here, relPath), text)
}
git(here, ["add", "-A"])
git(here, ["commit", "-m", "a page type filed into another repository"])

const away = join(here, "no-such-repo")

const ROOTS: Roots = {
  instructions: here,
  code: away,
  memory: elsewhere,
  books: away,
  stories: away,
  "code-editor": away,
}

const RELATIVE = "pages/probe/one.probe.md"

afterAll(() => {
  drainCommits()
  rmSync(here, { recursive: true, force: true })
  rmSync(elsewhere, { recursive: true, force: true })
})

describe("a page whose type is filed into a repository the call does not address", () => {
  it("is placed in the repository its page type names", () => {
    const at = whereFor(ROOTS, "probe", "one")
    expect(at?.repo).toBe("memory")
    expect(at?.root).toBe(elsewhere)
    expect(at?.relPath).toBe(RELATIVE)
  })

  it("lands there rather than in the repository the call addresses", () => {
    writePage(ROOTS, "probe", "one", { title: "One" }, "tester")
    expect(existsSync(join(elsewhere, RELATIVE))).toBe(true)
    expect(existsSync(join(here, RELATIVE))).toBe(false)
  })

  it("is taken away from there rather than from the repository the call addresses", () => {
    writePage(ROOTS, "probe", "two", { title: "Two" }, "tester")
    const gone = removePage(ROOTS, "probe", "two", "tester")
    expect(gone?.root).toBe(elsewhere)
    expect(gone?.absent).toBeUndefined()
    expect(existsSync(join(elsewhere, "pages/probe/two.probe.md"))).toBe(false)
  })
})
