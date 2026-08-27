import { readdirSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { describe, expect, test } from "bun:test"
import { bunEntriesIn, bunEntryIn } from "./bun-entry.ts"

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..", "..", "..")

const DECLARATION_DIR = join(REPO_ROOT, "pages", "workflow-template")

const BUN_INVOCATION = /\bbun (?:[^"'`\n]{0,200})/g

const declarationBodies = (): readonly string[] => {
  let names: readonly string[]
  try {
    names = readdirSync(DECLARATION_DIR)
  } catch (cause) {
    throw new Error(
      `bun-entry: the workflow declarations at ${DECLARATION_DIR} could not be read, so this test would ` +
        "report a clean run over a population of nothing",
      { cause }
    )
  }
  const held = names.filter((name) => name.endsWith(".ts")).map((name) => join(DECLARATION_DIR, name))
  if (held.length === 0) {
    throw new Error(`bun-entry: no workflow declaration stands in ${DECLARATION_DIR}`)
  }
  return held.map((path) => readFileSync(path, "utf-8"))
}

describe("which file a bun invocation in a step's commands starts", () => {
  test("a workspace-rooted invocation names the file the step runs", () => {
    expect(
      bunEntryIn("bun $WORKSPACE/packages/infra/scripts/src/set-app-live-version.ts --app temper-web")
    ).toEqual({ repo: "code", path: "packages/infra/scripts/src/set-app-live-version.ts" })
  })

  test("a quoted path is taken without its quotes", () => {
    expect(bunEntryIn('bun "$WS/infra/k8s-synth/src/manifests.ts" --write')).toEqual({
      repo: "code",
      path: "infra/k8s-synth/src/manifests.ts",
    })
  })

  test("a `run` subcommand does not stop the scan", () => {
    expect(bunEntryIn("bun run packages/infra/scripts/src/install.ts")).toEqual({
      repo: "code",
      path: "packages/infra/scripts/src/install.ts",
    })
  })

  test("an instructions-rooted path lands in the instructions repo", () => {
    expect(bunEntryIn("bun $INSTRUCTIONS_ROOT/tools/lib/cluster-rbac/rules.ts")).toEqual({
      repo: "instructions",
      path: "tools/lib/cluster-rbac/rules.ts",
    })
  })

  test("only the first path is taken, so a flag's value is not read as the entry", () => {
    expect(bunEntryIn("bun packages/a/run.ts --config packages/b/other.ts")).toEqual({
      repo: "code",
      path: "packages/a/run.ts",
    })
  })

  test("an invocation carrying inline code runs no file, whatever paths it spells", () => {
    expect(bunEntryIn("bun -e await import('$INSTRUCTIONS_ROOT/tools/lib/cluster-rbac/rules.ts')")).toBeNull()
  })

  test("a bun subcommand that is not a path is not one", () => {
    expect(bunEntryIn("bun install --frozen-lockfile")).toBeNull()
    expect(bunEntryIn("bun run build")).toBeNull()
  })

  test("a command bun does not head is not a bun invocation", () => {
    expect(bunEntryIn("cd $WORKSPACE")).toBeNull()
    expect(bunEntryIn("sed -i s/a/b/ packages/infra/scripts/src/install.ts")).toBeNull()
  })

  test("the planted case: a cd target and a sed argument beside a real entry", () => {
    expect(
      bunEntriesIn([
        "cd $WORKSPACE && bun packages/infra/k8s/src/prometheus/verify-live-rules.ts",
        "sed -i s/x/y/ packages/infra/scripts/src/set-app-live-version.ts",
      ])
    ).toEqual([{ repo: "code", path: "packages/infra/k8s/src/prometheus/verify-live-rules.ts" }])
  })

  test("a clean case stays quiet", () => {
    expect(bunEntriesIn(["set -e", "cd $WORKSPACE", "bun install --frozen-lockfile"])).toEqual([])
  })
})

describe("the bun invocations the workflow declarations actually spell", () => {
  test("every invocation naming a TypeScript path yields that path, and no other yields one", () => {
    const spellings = new Set<string>()
    for (const body of declarationBodies()) {
      for (const found of body.matchAll(BUN_INVOCATION)) spellings.add(found[0].trim())
    }
    const population = spellings.size
    expect(population).toBeGreaterThan(0)

    const naming: string[] = []
    const silent: string[] = []
    for (const spelling of spellings) {
      const rendered = spelling.replaceAll("${ci.workspace}", "$WORKSPACE")
      const named = bunEntryIn(rendered)
      if (named === null) silent.push(spelling)
      else naming.push(spelling)
    }

    expect(naming.length + silent.length).toBe(population)
    for (const spelling of naming) expect(spelling).toContain(".ts")
    for (const spelling of silent) expect(spelling).not.toMatch(/\bbun \S*\/\S+\.ts\b/u)
  })
})
