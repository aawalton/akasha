import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"

import {
  FUNCTIONAL_TYPES,
  type FunctionalType,
  FunctionalTypeSchema,
  isLibraryType,
  LIBRARY_TYPES,
  RANK_BY_TYPE,
  readFunctionalType,
  workspacePackageJsonPath,
} from "./functional-type.ts"

describe("FUNCTIONAL_TYPES", () => {
  test("contains exactly ten values", () => {
    expect(FUNCTIONAL_TYPES.length).toBe(10)
  })

  test("has no duplicates", () => {
    expect(new Set(FUNCTIONAL_TYPES).size).toBe(FUNCTIONAL_TYPES.length)
  })

  test("includes every documented value", () => {
    const expected: ReadonlyArray<FunctionalType> = [
      "addon",
      "next-app",
      "service",
      "worker",
      "program",
      "next-ui",
      "local-service",
      "access",
      "io",
      "pure",
    ]
    for (const value of expected) {
      expect(FUNCTIONAL_TYPES).toContain(value)
    }
  })
})

describe("FunctionalTypeSchema", () => {
  test("accepts every declared value", () => {
    for (const t of FUNCTIONAL_TYPES) {
      expect(() => FunctionalTypeSchema.parse(t)).not.toThrow()
    }
  })

  test("rejects the legacy `ui` label", () => {
    expect(() => FunctionalTypeSchema.parse("ui")).toThrow()
  })

  test("rejects empty strings", () => {
    expect(() => FunctionalTypeSchema.parse("")).toThrow()
  })

  test("rejects non-string inputs", () => {
    expect(() => FunctionalTypeSchema.parse(123)).toThrow()
    expect(() => FunctionalTypeSchema.parse(null)).toThrow()
    expect(() => FunctionalTypeSchema.parse(undefined)).toThrow()
  })
})

describe("RANK_BY_TYPE", () => {
  test("has an entry for every functional type", () => {
    for (const t of FUNCTIONAL_TYPES) {
      expect(typeof RANK_BY_TYPE[t]).toBe("number")
    }
  })

  test("encodes the documented ordering", () => {
    expect(RANK_BY_TYPE.pure).toBe(1)
    expect(RANK_BY_TYPE.access).toBe(2)
    expect(RANK_BY_TYPE["next-ui"]).toBe(4)
    expect(RANK_BY_TYPE["next-app"]).toBe(4)
    expect(RANK_BY_TYPE.service).toBe(4)
    expect(RANK_BY_TYPE.worker).toBe(4)
    expect(RANK_BY_TYPE.program).toBe(4)
    expect(RANK_BY_TYPE.addon).toBe(4)
    expect(RANK_BY_TYPE["local-service"]).toBe(4)
  })

  test("rank is strictly monotonic across the three tiers", () => {
    expect(RANK_BY_TYPE.pure).toBeLessThan(RANK_BY_TYPE.access)
    expect(RANK_BY_TYPE.access).toBeLessThan(RANK_BY_TYPE["next-ui"])
  })
})

describe("readFunctionalType", () => {
  let tmp: string

  beforeEach(() => {
    tmp = mkdtempSync(join(tmpdir(), "functional-type-"))
  })

  afterEach(() => {
    rmSync(tmp, { recursive: true, force: true })
  })

  test("missing file → { type: null, raw: undefined }", () => {
    const result = readFunctionalType(join(tmp, "does-not-exist", "package.json"))
    expect(result).toEqual({ type: null, raw: undefined })
  })

  test("unparseable JSON → { type: null, raw: undefined }", () => {
    const path = join(tmp, "package.json")
    writeFileSync(path, "{not valid json", "utf-8")
    const result = readFunctionalType(path)
    expect(result).toEqual({ type: null, raw: undefined })
  })

  test("valid JSON without functionalType field → { type: null, raw: undefined }", () => {
    const path = join(tmp, "package.json")
    writeFileSync(path, JSON.stringify({ name: "@x/y", version: "0.0.0" }), "utf-8")
    const result = readFunctionalType(path)
    expect(result).toEqual({ type: null, raw: undefined })
  })

  test("valid functionalType → { type, raw } both set", () => {
    const path = join(tmp, "package.json")
    writeFileSync(path, JSON.stringify({ name: "@x/y", functionalType: "pure" }), "utf-8")
    const result = readFunctionalType(path)
    expect(result).toEqual({ type: "pure", raw: "pure" })
  })

  test("each declared value round-trips", () => {
    for (const value of FUNCTIONAL_TYPES) {
      const path = join(tmp, `${value}.json`)
      writeFileSync(path, JSON.stringify({ name: "@x/y", functionalType: value }), "utf-8")
      expect(readFunctionalType(path)).toEqual({ type: value, raw: value })
    }
  })

  test("invalid functionalType value → { type: null, raw: <string> }", () => {
    const path = join(tmp, "package.json")
    writeFileSync(path, JSON.stringify({ name: "@x/y", functionalType: "ui" }), "utf-8")
    const result = readFunctionalType(path)
    expect(result).toEqual({ type: null, raw: "ui" })
  })

  test("non-string functionalType → { type: null, raw: undefined }", () => {
    const path = join(tmp, "package.json")
    writeFileSync(path, JSON.stringify({ name: "@x/y", functionalType: 42 }), "utf-8")
    const result = readFunctionalType(path)
    expect(result).toEqual({ type: null, raw: undefined })
  })
})

describe("LIBRARY_TYPES / isLibraryType", () => {
  test("library tier is exactly pure, access, io, next-ui", () => {
    expect(new Set(LIBRARY_TYPES)).toEqual(new Set(["pure", "access", "io", "next-ui"]))
  })

  test("isLibraryType is true for every library tier value", () => {
    for (const t of ["pure", "access", "io", "next-ui"] as const) {
      expect(isLibraryType(t)).toBe(true)
    }
  })

  test("isLibraryType is false for every runtime tier value", () => {
    for (const t of [
      "next-app",
      "service",
      "worker",
      "program",
      "addon",
      "local-service",
    ] as const) {
      expect(isLibraryType(t)).toBe(false)
    }
  })

  test("LIBRARY_TYPES partitions FUNCTIONAL_TYPES with the runtime complement", () => {
    const runtime = FUNCTIONAL_TYPES.filter((t) => !LIBRARY_TYPES.has(t))
    expect([...LIBRARY_TYPES].length + runtime.length).toBe(FUNCTIONAL_TYPES.length)
  })
})

describe("workspacePackageJsonPath", () => {
  test("joins repo root + workspace path + package.json", () => {
    const got = workspacePackageJsonPath("/repo", "packages/shared/pages/core")
    expect(got).toBe("/repo/packages/shared/pages/core/package.json")
  })

  test("absolute repo root is preserved", () => {
    const got = workspacePackageJsonPath("/abs/root", "a/b")
    expect(got).toBe("/abs/root/a/b/package.json")
  })
})
