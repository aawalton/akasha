import { describe, expect, test } from "bun:test"
import type { Landed } from "./relocated-path.ts"
import { parsed, quotedSwap, specsIn, tsconfigRelocated } from "./tsconfig-relocated.ts"

const LANDED: readonly Landed[] = [
  { from: "packages/temper/addons", to: "temper/addons" },
  { from: "packages/temper/game/items/core", to: "temper/game-items-core" },
  { from: "packages", to: "" },
  { from: "", to: "" },
]

const FROM = "packages/temper/game/items/addon"

const TO = "temper/game-items-addon"

const ADDON = `{
  "extends": "../../../addons/tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "../../../..",
    "outDir": "../../../addons/dist/TemperItems",
    "types": []
  },
  "include": ["src/**/*.ts", "../../../addons/types/eso/**/*.d.ts"],
  "exclude": ["src/**/*.test.ts"],
  "references": [{ "path": "../core" }]
}
`

describe("parsed", () => {
  test("a body with a trailing comma is still read, tsconfigs being written that way", () => {
    expect(parsed('{ "files": [], }')).toEqual({ files: [] })
  })

  test("a body that is not an object answers nothing", () => {
    expect(parsed("[1, 2]")).toBe(null)
  })

  test("a body that is not JSON at all answers nothing", () => {
    expect(parsed("not json")).toBe(null)
  })
})

describe("specsIn", () => {
  test("it gathers every place a tsconfig names a path", () => {
    const config = parsed(ADDON)
    expect(config).not.toBe(null)
    expect([...specsIn(config as Record<string, unknown>)].sort()).toEqual(
      [
        "../../../addons/tsconfig.base.json",
        "../../../..",
        "../../../addons/dist/TemperItems",
        "src/**/*.ts",
        "../../../addons/types/eso/**/*.d.ts",
        "src/**/*.test.ts",
        "../core",
      ].sort()
    )
  })

  test("it names each path once, however many keys carry it", () => {
    const config = parsed('{ "include": ["src"], "exclude": ["src"] }')
    expect(specsIn(config as Record<string, unknown>)).toEqual(["src"])
  })

  test("a path under compilerOptions.paths is gathered", () => {
    const config = parsed('{ "compilerOptions": { "paths": { "x": ["../y/src"] } } }')
    expect(specsIn(config as Record<string, unknown>)).toEqual(["../y/src"])
  })

  test("a key holding no string contributes nothing", () => {
    const config = parsed('{ "extends": 3, "include": [1, "src"] }')
    expect(specsIn(config as Record<string, unknown>)).toEqual(["src"])
  })
})

describe("quotedSwap", () => {
  test("it swaps a whole quoted value and not a longer one beginning the same way", () => {
    const body = '{ "a": "../..", "b": "../../x" }'
    expect(quotedSwap(body, "../..", "../")).toBe('{ "a": "../", "b": "../../x" }')
  })

  test("it swaps every occurrence, one spec meaning one target", () => {
    expect(quotedSwap('["src", "src"]', "src", "./src")).toBe('["./src", "./src"]')
  })
})

describe("tsconfigRelocated", () => {
  test("it rewrites every path the move changes and leaves the rest of the body alone", () => {
    const out = tsconfigRelocated(ADDON, FROM, TO, LANDED)
    expect(out).not.toBe(null)
    const body = (out as { body: string }).body
    expect(body).toContain('"extends": "../addons/tsconfig.base.json"')
    expect(body).toContain('"rootDir": "../.."')
    expect(body).toContain('"outDir": "../addons/dist/TemperItems"')
    expect(body).toContain('"../addons/types/eso/**/*.d.ts"')
    expect(body).toContain('"path": "../game-items-core"')
    expect(body).toContain('"types": []')
  })

  test("a path inside the package keeps its meaning and its spelling across the move", () => {
    const out = tsconfigRelocated(ADDON, FROM, TO, LANDED)
    expect((out as { body: string }).body).toContain('"src/**/*.ts"')
  })

  test("it reports what it renamed, so a caller can say what it did", () => {
    const out = tsconfigRelocated(ADDON, FROM, TO, LANDED) as { renamed: readonly unknown[] }
    expect(out.renamed).toContainEqual({ spec: "../core", to: "../game-items-core" })
  })

  const STAYING: readonly Landed[] = [
    ...LANDED,
    { from: "packages/shared/utils/narrow", to: null },
  ]

  test("a package that has not moved is refused by name rather than guessed at", () => {
    const body = '{ "extends": "../../../../shared/utils/narrow/tsconfig.json" }'
    const out = tsconfigRelocated(body, FROM, TO, STAYING) as { refused: readonly string[] }
    expect(out.refused).toEqual(["../../../../shared/utils/narrow/tsconfig.json"])
  })

  test("a refused path is left as written, so nothing half-rewritten lands", () => {
    const body = '{ "extends": "../../../../shared/utils/narrow/tsconfig.json" }'
    const out = tsconfigRelocated(body, FROM, TO, STAYING) as { body: string }
    expect(out.body).toBe(body)
  })

  test("one refused path does not stop the others in the same file being rewritten", () => {
    const body =
      '{ "extends": "../../../../shared/utils/narrow/tsconfig.json", "references": [{ "path": "../core" }] }'
    const out = tsconfigRelocated(body, FROM, TO, STAYING) as {
      body: string
      refused: readonly string[]
    }
    expect(out.refused).toHaveLength(1)
    expect(out.body).toContain('"path": "../game-items-core"')
  })

  test("a body that is not a tsconfig object answers nothing", () => {
    expect(tsconfigRelocated("nonsense", FROM, TO, LANDED)).toBe(null)
  })

  test("a move that changes no path leaves the body byte for byte", () => {
    const body = '{ "include": ["src"] }'
    const out = tsconfigRelocated(body, "a", "a", LANDED) as {
      body: string
      renamed: readonly unknown[]
    }
    expect(out.body).toBe(body)
    expect(out.renamed).toEqual([])
  })
})
