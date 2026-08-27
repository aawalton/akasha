import { describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { pagesHoldShape } from "../audits/pages-hold-shape.ts"
import type { CheckOutcome, RepoView } from "../lib/check.ts"
import type { Repo } from "../../page/document/types.ts"
import { over } from "../../outcome/outcome"
import { runChecks } from "../run-checks.ts"

function rootsAt(instructions: string): RepoView["roots"] {
  return {
    instructions,
    code: `${instructions}/nonexistent-code`,
    memory: `${instructions}/nonexistent-memory`,
    books: `${instructions}/nonexistent-books`,
    stories: `${instructions}/nonexistent-stories`,
    "code-editor": `${instructions}/nonexistent-code-editor`,
  }
}

function viewOf(name: Repo, instructions: string, documents: readonly string[] = []): RepoView {
  return { roots: rootsAt(instructions), name, documents, read: () => "", exists: () => false }
}

const HERE = new URL("../../", import.meta.url).pathname

function liveView(documents: readonly string[]): RepoView {
  return {
    roots: rootsAt(HERE),
    name: "instructions",
    documents,
    read: (relPath) => readFileSync(`${HERE}${relPath}`, "utf8"),
    exists: () => true,
  }
}

function registryClaimingInstructions(): string {
  const root = mkdtempSync(join("/var/tmp", "8b62-registry-"))
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
    const root = registryClaimingInstructions()
    try {
      const outcome = pagesHoldShape(viewOf("books", root))
      expect(outcome.verdict).toBe("not-applicable")
      expect(outcome.population).toEqual(over(0, "claimed page(s)"))
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  test("names why it did not apply, an unexplained skip being the defect rather than the fix", () => {
    const root = registryClaimingInstructions()
    try {
      const outcome = pagesHoldShape(viewOf("books", root))
      expect(outcome.detail).toContain("books")
      expect(outcome.detail).toContain("no page type names books")
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  test("parts a registry claiming nothing anywhere from one claiming another repo", () => {
    const bare = mkdtempSync(join("/var/tmp", "8b62-bare-"))
    const claiming = registryClaimingInstructions()
    try {
      const outcome = pagesHoldShape(viewOf("books", bare))
      const elsewhere = pagesHoldShape(viewOf("books", claiming))
      expect(outcome.verdict).toBe("not-applicable")
      expect(elsewhere.verdict).toBe("not-applicable")
      expect(outcome.detail).not.toBe(elsewhere.detail)
    } finally {
      rmSync(bare, { recursive: true, force: true })
      rmSync(claiming, { recursive: true, force: true })
    }
  })
})

describe("the check over a tree it does reach", () => {
  test("pages-hold-shape judges rather than skipping, over the pages this repo claims", () => {
    const outcome = pagesHoldShape(liveView([]))
    expect(outcome.verdict).not.toBe("not-applicable")
    expect(outcome.population.measured).toBeGreaterThan(0)
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
      { quiet: { repos: ["books"], run: () => skipped("quiet") } },
      (repo) => viewOf(repo, "/nonexistent-instructions"),
      []
    )
    expect(outcomes[0]?.verdict).toBe("not-applicable")
    expect(outcomes[0]?.messages).toHaveLength(0)
  })

  test("does not stop the suite, an honest emptiness being no refusal", async () => {
    const outcomes = await runChecks(
      { quiet: { repos: ["books"], run: () => skipped("quiet") } },
      (repo) => viewOf(repo, "/nonexistent-instructions"),
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
      { quiet: { repos: ["books"], run: passing } },
      (repo) => viewOf(repo, "/nonexistent-instructions"),
      []
    )
    expect(outcomes[0]?.verdict).toBe("fail")
  })
})
