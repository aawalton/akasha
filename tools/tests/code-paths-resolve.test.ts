
import { afterAll, beforeAll, describe, expect, test } from "bun:test"
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { codePathsResolve } from "../audits/code-paths-resolve.ts"
import type { RepoView } from "../lib/check.ts"
import { refusalDirIn } from "../lib/refusal.ts"

/**
 * ONE TREE, NOT TWO. A second root stood here for the `code` repository, holding the files a
 * reference was to resolve in when this one did not. That repository is absorbed, and
 * `tools/audits/code-paths-resolve.ts` resolves every reference against the akasha root alone, so
 * what a second root held is planted here and the cases resting on the split are gone.
 */
let akasha = ""

function put(root: string, rel: string, body: string): void {
  const file = `${root}/${rel}`
  mkdirSync(file.slice(0, file.lastIndexOf("/")), { recursive: true })
  writeFileSync(file, body)
}

function reaching(ref: string): string {
  return `import { codeModule } from "../../lib/code-import.ts"\nconst REF = "${ref}"\nexport const held = codeModule(REF)\n`
}

function view(): RepoView {
  return {
    roots: { akasha, "code-editor": "/nonexistent-code-editor" },
    name: "akasha",
    documents: [],
    read: () => "",
    exists: (absolute) => existsSync(absolute),
  }
}

function seedRefusals(root: string): void {
  const live = `${import.meta.dir}/../..`
  const refusals = refusalDirIn(live)
  for (const slug of [
    "code-path-unresolved",
    "code-reach-unresolved",
    "code-specifier-unresolved",
  ]) {
    put(root, `${refusals}/${slug}.refusal.md`, "")
    copyFileSync(`${live}/${refusals}/${slug}.refusal.md`, `${root}/${refusals}/${slug}.refusal.md`)
  }
}

beforeAll(() => {
  akasha = mkdtempSync("/var/tmp/code-paths-akasha-")
  put(akasha, "packages/agents/shared/db.ts", "export const there = 1\n")
  put(akasha, "node_modules/@agents/shared/index.ts", "export const there = 1\n")
  put(
    akasha,
    "node_modules/@agents/shared/package.json",
    JSON.stringify({ name: "@agents/shared", exports: { ".": "./index.ts" } })
  )
  seedRefusals(akasha)
})

afterAll(() => {
  if (akasha !== "") rmSync(akasha, { recursive: true, force: true })
})

describe("codePathsResolve", () => {
  test("a reference standing nowhere is refused whichever spelling names it", () => {
    put(akasha, "tools/commands/claude-account/gone.ts", reaching("packages/agents/shared/moved-away.ts"))
    put(akasha, "tools/commands/claude-account/away.ts", reaching("@agents/moved-away"))
    const outcome = codePathsResolve(view())
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toHaveLength(2)
    expect(outcome.messages.join("\n")).toContain("packages/agents/shared/moved-away.ts")
    expect(outcome.messages.join("\n")).toContain("@agents/moved-away")
  })

  // WHAT WENT FROM THIS CASE: "a bare literal counts wherever it stands". A plain literal resolved
  // from whichever of two roots held it, and there is one root now, so the claim has no subject —
  // the two literal sites that carried it are gone with it. The two claims left stand on their own:
  // a reference that resolves is measured rather than refused, and a file under `tools/tests/` is
  // not read at all. The count catches that exclusion twice: were the fixture read, its
  // `packages/infra/x.ts` would be a fifth reference and a third refusal.
  test("a reference that stands is measured rather than refused, and a tools/tests fixture is not read", () => {
    put(akasha, "tools/commands/claude-account/held.ts", reaching("packages/agents/shared/db.ts"))
    put(akasha, "tools/commands/claude-account/named.ts", reaching("@agents/shared"))
    put(akasha, "tools/tests/some.test.ts", reaching("packages/infra/x.ts"))
    const outcome = codePathsResolve(view())
    expect(outcome.messages).toHaveLength(2)
    expect(outcome.population.measured).toBe(4)
  })

  test("a tree holding nothing to read fails rather than passing over nothing", () => {
    const empty = mkdtempSync("/var/tmp/code-paths-empty-")
    try {
      const outcome = codePathsResolve({ ...view(), roots: { akasha: empty, "code-editor": "/nonexistent-code-editor" } })
      expect(outcome.verdict).toBe("fail")
      expect(outcome.population.measured).toBe(0)
    } finally {
      rmSync(empty, { recursive: true, force: true })
    }
  })
})
