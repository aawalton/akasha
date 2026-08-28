import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { afterAll, describe, expect, test } from "bun:test"
import { ownRepoRoot } from "../../../repo/roots/roots"
import { codeRoot as ownCodeRoot } from "../code-root.ts"
import { CURATION_DIR, CURATION_FILE, curationDispatchNodes } from "./curation-dispatch.ts"
import { declaredCheckEntries } from "./declared-check-configs.ts"

const SCRATCH = "/var/tmp"

const SCOPED_PARTS: readonly string[] = [
  "ast-unused.alanwalton.config.json",
  "ast-unused.archive-of-worlds.config.json",
  "ast-unused.audhdalan.config.json",
  "ast-unused.automation.config.json",
  "ast-unused.collections.config.json",
  "ast-unused.infra.config.json",
  "ast-unused.shared.config.json",
  "ast-unused.smilingjenny.config.json",
  "ast-unused.temper.config.json",
]

const codeRoot = process.env.WORKSPACE ?? ownCodeRoot()

const curationParts = (): readonly string[] => {
  const held: unknown = JSON.parse(readFileSync(resolve(ownRepoRoot(), CURATION_FILE), "utf-8"))
  const parts = (held as { readonly parts?: unknown }).parts
  return Array.isArray(parts) ? parts.filter((one): one is string => typeof one === "string") : []
}

const { entries } = await declaredCheckEntries(codeRoot)

const watched: ReadonlySet<string> = new Set(
  entries.flatMap((entry) => {
    const held = entry.config.dispatchNodes
    return Array.isArray(held) ? held.filter((one): one is string => typeof one === "string") : []
  })
)

const roots: string[] = []

const rootHolding = (body: unknown): string => {
  const at = mkdtempSync(join(SCRATCH, "curation-dispatch-"))
  roots.push(at)
  const standing = join(at, CURATION_FILE)
  mkdirSync(dirname(standing), { recursive: true })
  writeFileSync(standing, JSON.stringify(body))
  return at
}

afterAll(() => {
  for (const at of roots) rmSync(at, { recursive: true, force: true })
})

describe("the curation the ts-file producer reads is watched, parts and all", () => {
  test("the reading itself is not empty, so a silence here is the tree and not the instrument", () => {
    expect({ checks: entries.length > 0, watched: watched.size > 0 }).toEqual({
      checks: true,
      watched: true,
    })
  })

  test("the curation file itself is watched", () => {
    expect([...watched]).toContain(`json-file:instructions:${CURATION_FILE}`)
  })

  test("every part the curation standing here names is watched", () => {
    const unwatched = curationParts().filter(
      (part) => !watched.has(`json-file:instructions:${CURATION_DIR}/${part}`)
    )
    expect(unwatched).toEqual([])
  })
})

describe("curationDispatchNodes follows the parts a curation names", () => {
  test("a curation split one file per package family yields a node id for each, and for itself", () => {
    expect([...curationDispatchNodes(rootHolding({ parts: SCOPED_PARTS }))]).toEqual([
      `json-file:instructions:${CURATION_FILE}`,
      ...SCOPED_PARTS.map((part) => `json-file:instructions:${CURATION_DIR}/${part}`),
    ])
  })

  test("a curation naming no parts yields only itself", () => {
    expect([...curationDispatchNodes(rootHolding({ workspaces: {} }))]).toEqual([
      `json-file:instructions:${CURATION_FILE}`,
    ])
  })

  test("a curation that is not there refuses rather than composing an empty watch", () => {
    const at = mkdtempSync(join(SCRATCH, "curation-absent-"))
    roots.push(at)
    expect(() => curationDispatchNodes(at)).toThrow(/is not there/)
  })

  test("a curation that is not the JSON it has to be refuses", () => {
    const at = mkdtempSync(join(SCRATCH, "curation-bad-"))
    roots.push(at)
    const standing = join(at, CURATION_FILE)
    mkdirSync(dirname(standing), { recursive: true })
    writeFileSync(standing, "{ not json")
    expect(() => curationDispatchNodes(at)).toThrow(/is not the JSON it has to be/)
  })
})
