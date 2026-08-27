import { describe, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import ts from "typescript"
import { examineFilePopulation, examinePopulation, populationCoverage } from "./population.ts"
import { renderBound } from "./population-bound.ts"
import { computeExitCode } from "./violation-reporter.ts"

const readerRefusing =
  (unreadable: readonly string[]) =>
  (path: string): string => {
    if (unreadable.includes(path)) throw new Error(`EACCES: permission denied, open '${path}'`)
    return `contents of ${path}`
  }

describe("a Population cannot be assembled by hand", () => {
  test("the exported type carries a brand no call site can spell", () => {
    const source = ts.createSourceFile(
      "population.ts",
      readFileSync(join(import.meta.dir, "population.ts"), "utf-8"),
      ts.ScriptTarget.Latest,
      true
    )
    const alias = source.statements
      .filter(ts.isTypeAliasDeclaration)
      .find((s) => s.name.text === "Population")
    expect(alias).toBeDefined()
    expect(alias?.type.kind).toBe(ts.SyntaxKind.IntersectionType)
    expect(alias?.type.getText()).toContain("__brand")
  })
})

describe("examineFilePopulation — the denominator is what was enumerated", () => {
  test("a clean run examines every enumerated member and certifies all of them", () => {
    const { population, violations } = examineFilePopulation({
      files: ["a.ts", "b.ts", "c.ts"],
      unit: "files",
      membership: {
        kind: "enumerated",
        because:
          "the members are a literal spelled in this test, so there is no acquisition to come back short",
      },
      readFile: readerRefusing([]),
      scan: () => [],
    })
    expect(violations).toEqual([])
    expect(populationCoverage(population)).toEqual({ observed: 3, declared: 3, unit: "files" })
    expect(renderBound(population)).toStartWith("[over 3 of 3 files]")
    expect(computeExitCode({ violationCount: 0, population })).toBe(0)
  })

  test("an unreadable member leaves the numerator and STAYS in the denominator", () => {
    const { population } = examineFilePopulation({
      files: ["a.ts", "b.ts", "c.ts", "d.ts"],
      unit: "files",
      membership: {
        kind: "enumerated",
        because:
          "the members are a literal spelled in this test, so there is no acquisition to come back short",
      },
      readFile: readerRefusing(["b.ts", "d.ts"]),
      scan: () => [],
    })
    expect(populationCoverage(population)).toEqual({ observed: 2, declared: 4, unit: "files" })
    expect(renderBound(population)).toStartWith("[over 2 of 4 files — 2 could not be examined]")
  })

  test("a member this run could not examine is not a run that passed", () => {
    const { population } = examineFilePopulation({
      files: ["a.ts", "b.ts"],
      unit: "files",
      membership: {
        kind: "enumerated",
        because:
          "the members are a literal spelled in this test, so there is no acquisition to come back short",
      },
      readFile: readerRefusing(["b.ts"]),
      scan: () => [],
    })
    expect(computeExitCode({ violationCount: 0, population })).toBe(2)
  })

  test("the scan never sees a member whose read failed, so it has nothing to swallow", () => {
    const scanned: string[] = []
    examineFilePopulation({
      files: ["a.ts", "b.ts", "c.ts"],
      unit: "files",
      membership: {
        kind: "enumerated",
        because:
          "the members are a literal spelled in this test, so there is no acquisition to come back short",
      },
      readFile: readerRefusing(["b.ts"]),
      scan: (label, source) => {
        scanned.push(`${label}=${source}`)
        return []
      },
    })
    expect(scanned).toEqual(["a.ts=contents of a.ts", "c.ts=contents of c.ts"])
  })

  test("findings flow through in enumeration order, labelled by the member", () => {
    const { violations } = examineFilePopulation({
      files: ["a.ts", "b.ts"],
      unit: "files",
      membership: {
        kind: "enumerated",
        because:
          "the members are a literal spelled in this test, so there is no acquisition to come back short",
      },
      readFile: readerRefusing([]),
      scan: (label) => [{ file: label, message: "bad" }],
    })
    expect(violations).toEqual([
      { file: "a.ts", message: "bad" },
      { file: "b.ts", message: "bad" },
    ])
  })

  test("`pathOf` separates where a member is READ from what it is CALLED", () => {
    const { population, violations } = examineFilePopulation({
      files: ["src/a.ts"],
      unit: "files",
      membership: {
        kind: "enumerated",
        because:
          "the members are a literal spelled in this test, so there is no acquisition to come back short",
      },
      pathOf: (rel) => `/repo/${rel}`,
      readFile: readerRefusing([]),
      scan: (label, source) => [{ file: label, message: source }],
    })
    expect(violations).toEqual([{ file: "src/a.ts", message: "contents of /repo/src/a.ts" }])
    expect(renderBound(population)).toStartWith("[over 1 of 1 files]")
  })

  test("enumerating nothing is still an empty population, not a shortfall", () => {
    const { population } = examineFilePopulation({
      files: [],
      unit: "files",
      membership: {
        kind: "enumerated",
        because:
          "the members are a literal spelled in this test, so there is no acquisition to come back short",
      },
      readFile: readerRefusing([]),
      scan: () => [],
    })
    expect(renderBound(population)).toBe(
      "[EMPTY POPULATION — 0 files: this run examined nothing, so it certifies nothing]"
    )
    expect(computeExitCode({ violationCount: 0, population })).toBe(2)
  })
})

describe("a filter's placement decides whether the member is claimed", () => {
  const OUT_BY_SOURCE = "// @generated\n"
  const sourceOf = (path: string): string => (path === "gen.ts" ? OUT_BY_SOURCE : "real code\n")
  const inScope = (rel: string): boolean => !rel.endsWith(".d.ts")

  test("a path-kind filter on `files` takes the member out of the claim AND the denominator", () => {
    const scanned: string[] = []
    const { population } = examineFilePopulation({
      files: ["a.ts", "types.d.ts", "gen.ts"].filter(inScope),
      unit: "files",
      membership: {
        kind: "enumerated",
        because:
          "the members are a literal spelled in this test, so there is no acquisition to come back short",
      },
      readFile: sourceOf,
      scan: (label) => {
        scanned.push(label)
        return []
      },
    })
    expect(scanned).toEqual(["a.ts", "gen.ts"])
    expect(renderBound(population)).toStartWith("[over 2 of 2 files]")
  })

  test("a source-kind filter in `scan` keeps the member, because it was read", () => {
    const scanned: string[] = []
    const { population, violations } = examineFilePopulation({
      files: ["a.ts", "types.d.ts", "gen.ts"].filter(inScope),
      unit: "files",
      membership: {
        kind: "enumerated",
        because:
          "the members are a literal spelled in this test, so there is no acquisition to come back short",
      },
      readFile: sourceOf,
      scan: (label, source) => {
        scanned.push(label)
        if (source.startsWith("// @generated")) return []
        return [{ file: label }]
      },
    })
    expect(scanned).toEqual(["a.ts", "gen.ts"])
    expect(violations).toEqual([{ file: "a.ts" }])
    expect(renderBound(population)).toStartWith("[over 2 of 2 files]")
  })

  test("pre-reading to drop a source-excluded member understates the claim by one", () => {
    const preRead = ["a.ts", "types.d.ts", "gen.ts"]
      .filter(inScope)
      .filter((rel) => !sourceOf(rel).startsWith("// @generated"))
    const { population } = examineFilePopulation({
      files: preRead,
      unit: "files",
      membership: {
        kind: "enumerated",
        because:
          "the members are a literal spelled in this test, so there is no acquisition to come back short",
      },
      readFile: sourceOf,
      scan: () => [],
    })
    expect(renderBound(population)).toStartWith("[over 1 of 1 files]")
  })
})

describe("examinePopulation — a population that is not a file set", () => {
  interface Row {
    readonly id: string
    readonly value: number
  }

  const rows: readonly Row[] = [
    { id: "r1", value: 1 },
    { id: "r2", value: 2 },
    { id: "r3", value: 3 },
  ]

  const overRows = <V>(examine: (row: Row) => readonly V[]) =>
    examinePopulation({
      members: rows,
      unit: "rows",
      membership: {
        kind: "enumerated",
        because:
          "the members are a literal spelled in this test, so there is no acquisition to come back short",
      },
      labelOf: (row) => row.id,
      siteOf: () => null,
      examine,
    })

  test("the denominator is the members handed in, not what survived the walk", () => {
    const { population } = overRows((row) => {
      if (row.value > 1) throw new Error("row is gone")
      return []
    })
    expect(populationCoverage(population)).toEqual({ observed: 1, declared: 3, unit: "rows" })
  })

  test("a member whose examine threw is unexaminable, with the error's message as its reason", () => {
    const { population, violations } = overRows((row) => {
      if (row.id === "r2") throw new Error("r2 vanished mid-read")
      return [{ file: row.id }]
    })
    expect(population.unexaminable).toEqual([{ label: "r2", reason: "r2 vanished mid-read" }])
    expect(population.examined).toEqual(["r1", "r3"])
    expect(violations).toEqual([{ file: "r1" }, { file: "r3" }])
  })
})
