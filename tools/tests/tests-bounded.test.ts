import { afterEach, describe, expect, test } from "bun:test"
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join, resolve } from "node:path"
import type { RepoView } from "../lib/check.ts"
import { DEFAULT_CEILING_MS, statedTimeouts, testsBounded } from "../audits/tests-bounded.ts"
import { refusalText } from "../../refusal/refusal.ts"
import { rootsNamed } from "../../repo/roots/roots.ts"

const ROOT = resolve(import.meta.dir, "..", "..")

const REFUSAL = "pages/refusal/test-timeout-stated.refusal.md"

const made: string[] = []

afterEach(() => {
  while (made.length > 0) rmSync(made.pop() as string, { recursive: true, force: true })
})

function viewOf(root: string): RepoView {
  return {
    roots: rootsNamed({ akasha: root }),
    name: "akasha",
    documents: [],
    read: (relPath: string) => readFileSync(join(root, relPath), "utf8"),
    exists: () => false,
  } as RepoView
}

function planted(files: Readonly<Record<string, string>>): RepoView {
  const root = mkdtempSync("/var/tmp/tests-bounded-")
  made.push(root)
  mkdirSync(join(root, "tools", "tests"), { recursive: true })
  mkdirSync(join(root, "pages", "refusal"), { recursive: true })
  copyFileSync(join(ROOT, REFUSAL), join(root, REFUSAL))
  for (const [relPath, body] of Object.entries(files)) writeFileSync(join(root, relPath), body)
  return viewOf(root)
}

describe("what counts as a test stating its own ceiling", () => {
  test("a third argument on one line is found, with the line it stands on", () => {
    const found = statedTimeouts('test("a", () => {\n  ok()\n}, 60_000)\n')
    expect(found).toHaveLength(1)
    expect(found[0]?.stated).toBe("60_000")
    expect(found[0]?.line).toBe(1)
  })

  test("a third argument on its own line is found too — the shape a line-by-line scan misses", () => {
    const found = statedTimeouts(
      "it(\n  vector.name,\n  async () => {\n    await run()\n  },\n  120_000\n)\n"
    )
    expect(found).toHaveLength(1)
    expect(found[0]?.stated).toBe("120_000")
  })

  test("a constant is found rather than only a literal, since a name is how one hides", () => {
    expect(statedTimeouts('it("a", fn, TIMEOUT_MS)')[0]?.stated).toBe("TIMEOUT_MS")
  })

  test("an ordinary two-argument test states nothing", () => {
    expect(statedTimeouts('test("a", () => {\n  expect(1).toBe(1)\n})\n')).toEqual([])
  })

  test("a number the body hands to something else is not the test's own ceiling", () => {
    expect(
      statedTimeouts('it("a", async () => {\n  setInterval(() => {\n    beats += 1\n  }, 1)\n})\n')
    ).toEqual([])
  })

  test("a comma inside a string does not divide the arguments", () => {
    expect(statedTimeouts('test("a, b, c", () => {\n  ok()\n})\n')).toEqual([])
  })

  test("a comma inside a template hole does not divide them either", () => {
    expect(statedTimeouts("it(`both: ${one.a}, ${one.b}`, () => {\n  ok()\n})\n")).toEqual([])
  })

  test("`describe` is not a test, however many arguments it takes", () => {
    expect(statedTimeouts('describe("a", () => {\n  ok()\n}, 60_000)\n')).toEqual([])
  })

  test("a word ending in `it` is not `it`", () => {
    expect(statedTimeouts('await submit("a", fn, 60_000)\nawait wait("a", fn, 60_000)\n')).toEqual(
      []
    )
  })

  test("a call written inside a string is text — this file's own fixtures are that", () => {
    expect(statedTimeouts('const held = "test(\\"a\\", fn, 60_000)"\n')).toEqual([])
    expect(statedTimeouts('// it("a", fn, 60_000)\n')).toEqual([])
  })

  test("a modifier still reads as the call it modifies", () => {
    expect(statedTimeouts('test.skip("a", fn, 60_000)')[0]?.stated).toBe("60_000")
    expect(statedTimeouts('it.only("a", fn, 60_000)')[0]?.stated).toBe("60_000")
  })
})

describe("the check over a tree", () => {
  test("a planted ceiling is refused, and the refusal names where it stands", () => {
    const outcome = testsBounded(
      planted({ "tools/tests/one.test.ts": 'test("a", () => {\n  ok()\n}, 60_000)\n' })
    )
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages.join("\n")).toContain("tools/tests/one.test.ts:1")
    expect(outcome.messages.join("\n")).toContain("60_000")
  })

  test("the refusal it prints is the one standing on disk", () => {
    const outcome = testsBounded(
      planted({ "tools/tests/one.test.ts": 'test("a", () => {\n  ok()\n}, 60_000)\n' })
    )
    expect(outcome.messages[0]).toBe(
      refusalText(
        "test-timeout-stated",
        { stated: "1", ceiling: `${DEFAULT_CEILING_MS / 1000}` },
        ROOT
      )
    )
  })

  test("an on-demand file is not held to it, since the standard suite never runs one", () => {
    const outcome = testsBounded(
      planted({
        "tools/tests/one.test.ts": 'test("a", () => {\n  ok()\n})\n',
        "tools/tests/two.on-demand.test.ts": 'test("a", () => {\n  ok()\n}, 60_000)\n',
      })
    )
    expect(outcome.verdict).toBe("pass")
    expect(outcome.population.measured).toBe(1)
  })
})
