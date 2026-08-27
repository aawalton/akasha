import { afterAll, describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { esoCloneHeaderLines } from "../../shared-foundation-misc-eso-paths/src/eso-clone-stamp"
import { buildEsoClonePopulation, isGeneratedByPath, WALK_ROOT } from "./eso-clone-artifacts"

const ROOTS: string[] = []

function makeRoot(files: Readonly<Record<string, string>>): string {
  const root = mkdtempSync("/var/tmp/eso-clone-artifacts-")
  ROOTS.push(root)
  for (const [rel, body] of Object.entries(files)) {
    const path = join(root, rel)
    mkdirSync(dirname(path), { recursive: true })
    writeFileSync(path, body, "utf8")
  }
  mkdirSync(join(root, WALK_ROOT), { recursive: true })
  return root
}

afterAll(() => {
  for (const root of ROOTS) rmSync(root, { recursive: true, force: true })
})

const GENERATOR = `${WALK_ROOT}/x/generate.ts`

function artifact(generator: string, apiVersion: number): string {
  const header = esoCloneHeaderLines(generator, apiVersion)
    .map((line) => `// ${line}`)
    .join("\n")
  return `${header}\nexport const X = 1\n`
}

describe("isGeneratedByPath", () => {
  test.each([
    ["a `generated/` directory anywhere in the path", "packages/temper/a/generated/b.d.ts", true],
    ["a `.generated.` infix on the file name", "packages/temper/a/b.generated.ts", true],
    ["ordinary source beside a generated file", "packages/temper/a/b.ts", false],
    ["a file merely named `generated.ts`", "packages/temper/a/generated.ts", false],
  ])("%s → %p", (_desc, path, expected) => {
    expect(isGeneratedByPath(path)).toBe(expected)
  })
})

describe("membership", () => {
  test("a stamped artifact under a generated directory is a member", () => {
    const root = makeRoot({
      [`${WALK_ROOT}/a/generated/thing.d.ts`]: artifact(GENERATOR, 101050),
      [GENERATOR]: "// the generator\n",
    })
    const { artifacts, filesScanned } = buildEsoClonePopulation(root)
    expect(artifacts).toHaveLength(1)
    expect(filesScanned).toBe(1)
    expect(artifacts[0]?.version).toBe(101050)
    expect(artifacts[0]?.generator).toBe(GENERATOR)
  })

  test("a new artifact enters with no edit to the check", () => {
    const root = makeRoot({
      [`${WALK_ROOT}/a/generated/thing.d.ts`]: artifact(GENERATOR, 101050),
      [`${WALK_ROOT}/somewhere/entirely/new/generated/other.ts`]: artifact(GENERATOR, 101050),
      [GENERATOR]: "// the generator\n",
    })
    expect(buildEsoClonePopulation(root).artifacts).toHaveLength(2)
  })

  test("an artifact whose stamp was deleted stays a member, unstamped", () => {
    const [provenance] = esoCloneHeaderLines(GENERATOR, 101050)
    const root = makeRoot({
      [`${WALK_ROOT}/a/generated/thing.d.ts`]: `// ${provenance}\nexport const X = 1\n`,
      [GENERATOR]: "// the generator\n",
    })
    const { artifacts } = buildEsoClonePopulation(root)
    expect(artifacts).toHaveLength(1)
    expect(artifacts[0]?.version).toBeNull()
  })

  test("a generated file with no provenance line is not a member", () => {
    const root = makeRoot({
      [`${WALK_ROOT}/a/generated/unrelated.ts`]: "// GENERATED from the sets database\n",
    })
    const { artifacts, filesScanned } = buildEsoClonePopulation(root)
    expect(artifacts).toHaveLength(0)
    expect(filesScanned).toBe(1)
  })

  test("a non-generated file carrying the provenance text is not a member", () => {
    const root = makeRoot({
      [`${WALK_ROOT}/a/renderer.ts`]: artifact(GENERATOR, 101050),
      [GENERATOR]: "// the generator\n",
    })
    const { artifacts, filesScanned } = buildEsoClonePopulation(root)
    expect(artifacts).toHaveLength(0)
    expect(filesScanned).toBe(0)
  })
})

describe("what the walk covers", () => {
  test("build output and dependencies are skipped", () => {
    const root = makeRoot({
      [`${WALK_ROOT}/a/dist/generated/copy.ts`]: artifact(GENERATOR, 101050),
      [`${WALK_ROOT}/a/node_modules/p/generated/copy.ts`]: artifact(GENERATOR, 101050),
      [`${WALK_ROOT}/a/generated/real.ts`]: artifact(GENERATOR, 101050),
      [GENERATOR]: "// the generator\n",
    })
    const { artifacts } = buildEsoClonePopulation(root)
    expect(artifacts.map((a) => a.label)).toEqual([`${WALK_ROOT}/a/generated/real.ts`])
  })

  test("a tree holding no artifact yields an empty population rather than throwing", () => {
    const { artifacts, filesScanned } = buildEsoClonePopulation(makeRoot({}))
    expect(artifacts).toHaveLength(0)
    expect(filesScanned).toBe(0)
  })
})
