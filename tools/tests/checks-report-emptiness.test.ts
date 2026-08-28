import { describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { pagesHoldShape } from "../audits/pages-hold-shape.ts"
import type { CheckOutcome, RepoView } from "../lib/check.ts"
import type { Repo } from "../../page/document/types.ts"
import { over } from "../../outcome/outcome.ts"
import { runChecks } from "../run-checks.ts"

const BESIDE = "code-editor"

const EMPTY = `empty-${BESIDE}`

function rootsAt(akasha: string): RepoView["roots"] {
  return { akasha, [BESIDE]: join(akasha, EMPTY) }
}

function viewOf(name: Repo, akasha: string, documents: readonly string[] = []): RepoView {
  return { roots: rootsAt(akasha), name, documents, read: () => "", exists: () => false }
}

function checkoutAt(prefix: string): string {
  const root = mkdtempSync(join("/var/tmp", prefix))
  mkdirSync(join(root, EMPTY), { recursive: true })
  return root
}

function registryClaimingAkasha(): string {
  const root = checkoutAt("8b62-registry-")
  mkdirSync(join(root, "pages", "page-type"), { recursive: true })
  writeFileSync(
    join(root, "pages", "page-type", "domain.page-type.md"),
    "---\nid: 019ffe30-e158-7000-8ab9-73591dbe0225\nextends-slug: none\n---\n"
  )
  mkdirSync(join(root, "pages", "domain"), { recursive: true })
  return root
}

describe("pages-hold-shape over a repo no page type claims", () => {
  test("says it does not apply, rather than passing or failing", () => {
    const root = registryClaimingAkasha()
    try {
      const outcome = pagesHoldShape(viewOf(BESIDE, root))
      expect(outcome.verdict).toBe("not-applicable")
      expect(outcome.population).toEqual(over(0, "claimed page(s)"))
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  test("names why it did not apply, an unexplained skip being the defect rather than the fix", () => {
    const root = registryClaimingAkasha()
    try {
      const outcome = pagesHoldShape(viewOf(BESIDE, root))
      expect(outcome.detail).toContain(BESIDE)
      expect(outcome.detail).toContain(`no page type names ${BESIDE}`)
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  test("parts a registry claiming nothing anywhere from one claiming another repo", () => {
    const bare = checkoutAt("8b62-bare-")
    const claiming = registryClaimingAkasha()
    try {
      const outcome = pagesHoldShape(viewOf(BESIDE, bare))
      const elsewhere = pagesHoldShape(viewOf(BESIDE, claiming))
      expect(outcome.verdict).toBe("not-applicable")
      expect(elsewhere.verdict).toBe("not-applicable")
      expect(outcome.detail).not.toBe(elsewhere.detail)
    } finally {
      rmSync(bare, { recursive: true, force: true })
      rmSync(claiming, { recursive: true, force: true })
    }
  })
})

describe("a not-applicable a check certified over an empty population", () => {
  const skipped = (name: string): CheckOutcome => ({
    name,
    verdict: "not-applicable",
    detail: "nothing here is a thing this claims",
    messages: [],
    population: over(0, "thing(s)"),
  })

  test("survives certification, having already said what it measured and why", async () => {
    const outcomes = await runChecks(
      { quiet: { repos: [BESIDE], run: () => skipped("quiet") } },
      (repo) => viewOf(repo, "/nonexistent-akasha"),
      []
    )
    expect(outcomes[0]?.verdict).toBe("not-applicable")
    expect(outcomes[0]?.messages).toHaveLength(0)
  })

  test("does not stop the suite, an honest emptiness being no refusal", async () => {
    const outcomes = await runChecks(
      { quiet: { repos: [BESIDE], run: () => skipped("quiet") } },
      (repo) => viewOf(repo, "/nonexistent-akasha"),
      []
    )
    expect(outcomes.some((one) => one.verdict === "fail")).toBe(false)
  })

  test("is still refused where the check called it a pass instead", async () => {
    const passing = (): CheckOutcome => ({
      name: "quiet",
      verdict: "pass",
      detail: "nothing to report",
      messages: [],
      population: over(0, "thing(s)"),
    })
    const outcomes = await runChecks(
      { quiet: { repos: [BESIDE], run: passing } },
      (repo) => viewOf(repo, "/nonexistent-akasha"),
      []
    )
    expect(outcomes[0]?.verdict).toBe("fail")
  })
})
