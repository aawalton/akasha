import { existsSync, readFileSync } from "node:fs"
import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { findingsSorted } from "../audits/findings-sorted.ts"
import { type RepoView, listDocuments } from "../lib/check.ts"
import { findingsDirIn } from "../lib/finding.ts"
import { refusalText } from "../../refusal/refusal.ts"
import { fixture, type Fixture } from "./fixture.ts"
import { rootsNamed } from "../../repo/roots/roots.ts"

const store = (): string => findingsDirIn(at.root)

let at: Fixture

beforeEach(() => {
  at = fixture()
})
afterEach(() => at.dispose())

function repo(): RepoView {
  return {
    roots: rootsNamed({ akasha: at.root }),
    name: "akasha",
    documents: listDocuments(at.root),
    read: (relPath) => readFileSync(`${at.root}/${relPath}`, "utf8"),
    exists: existsSync,
  }
}

const says = (slug: string, values: Readonly<Record<string, string>>): string =>
  refusalText(slug, values, at.root)

function filed(relPath: string, owner: string): void {
  at.document(relPath, `domain-slug: ${owner}`)
}

describe("a finding under the folder its key names", () => {
  test("passes, and is counted as measured", () => {
    filed("pages/finding/role/sorted-claim.finding.md", "role")
    const outcome = findingsSorted(repo())
    expect(outcome.verdict).toBe("pass")
    expect(outcome.detail).toContain("1 finding")
  })

  test("passes where the key addresses the page type as well as the slug", () => {
    filed("pages/finding/role/addressed-claim.finding.md", "page-type/role")
    const outcome = findingsSorted(repo())
    expect(outcome.verdict).toBe("pass")
    expect(outcome.detail).toContain("1 finding")
  })
})

describe("a finding the folder does not account for", () => {
  test("directly under findings/ is refused", () => {
    filed("pages/finding/flat-claim.finding.md", "role")
    const outcome = findingsSorted(repo())
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toContain(
      says("finding-unfoldered", { path: "pages/finding/flat-claim.finding.md", store: store() })
    )
  })

  test("under another domain's folder is refused, and the folder its key names is printed", () => {
    filed("pages/finding/task/misplaced-claim.finding.md", "role")
    const outcome = findingsSorted(repo())
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toContain(
      says("finding-misfiled", {
        path: "pages/finding/task/misplaced-claim.finding.md",
        owner: "role",
        folder: "role",
        leaf: "misplaced-claim.finding.md",
        store: store(),
      })
    )
  })

  test("a key addressing another domain is refused against the slug half, not the whole address", () => {
    filed("pages/finding/task/addressed-claim.finding.md", "page-type/role")
    const outcome = findingsSorted(repo())
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toContain(
      says("finding-misfiled", {
        path: "pages/finding/task/addressed-claim.finding.md",
        owner: "page-type/role",
        folder: "role",
        leaf: "addressed-claim.finding.md",
        store: store(),
      })
    )
  })

  test("under a folder differing from its key by one character is refused", () => {
    filed("pages/finding/roles/near-miss-claim.finding.md", "role")
    expect(findingsSorted(repo()).verdict).toBe("fail")
  })

  test("under a cluster below its own domain is refused", () => {
    filed("pages/finding/role/cluster/deep-claim.finding.md", "role")
    const outcome = findingsSorted(repo())
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toContain(
      says("finding-too-deep", {
        path: "pages/finding/role/cluster/deep-claim.finding.md",
        depth: "2",
        store: store(),
      })
    )
  })
})

describe("what this check leaves to something else", () => {
  test("quarantine is measured by nothing, however it is filed there", () => {
    filed("dirty/pages/finding/flat-claim.finding.md", "role")
    filed("dirty/skills/role/pages/finding/deep-claim.finding.md", "role")
    const outcome = findingsSorted(repo())
    expect(outcome.verdict).toBe("pass")
    expect(outcome.detail).toContain("0 finding")
  })

  test("a finding declaring no domain is the schema's to refuse, not this one's", () => {
    at.document("pages/finding/role/keyless-claim.finding.md", "seq: 17485")
    expect(findingsSorted(repo()).verdict).toBe("pass")
  })
})
