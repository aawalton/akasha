import { describe, expect, test } from "bun:test"
import { parseFileFromText } from "../lib/graph/producers/file/ts-file/parse.ts"

describe("parseFileFromText (re-export typeOnly flag)", () => {
  test("`export type * from` is type-only", () => {
    const src = `export type * from "./mod"`
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.reExports).toEqual([
      { specifier: "./mod", typeOnly: true, importedSymbols: ["*"], reexportLocalNames: null },
    ])
  })

  test("`export { type X } from` (all-type named exports) is type-only", () => {
    const src = `export { type X, type Y } from "./mod"`
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.reExports).toEqual([
      {
        specifier: "./mod",
        typeOnly: true,
        importedSymbols: ["X", "Y"],
        reexportLocalNames: ["X", "Y"],
      },
    ])
  })

  test("mixed `export { A, type B } from` is NOT type-only", () => {
    const src = `export { A, type B } from "./mod"`
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.reExports).toEqual([
      {
        specifier: "./mod",
        typeOnly: false,
        importedSymbols: ["A", "B"],
        reexportLocalNames: ["A", "B"],
      },
    ])
  })

  test("`export type { X } from` (clause-flag) is type-only", () => {
    const src = `export type { X } from "./mod"`
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.reExports).toEqual([
      {
        specifier: "./mod",
        typeOnly: true,
        importedSymbols: ["X"],
        reexportLocalNames: ["X"],
      },
    ])
  })

  test("`export * from` (no clause) is NOT type-only", () => {
    const src = `export * from "./mod"`
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.reExports).toEqual([
      { specifier: "./mod", typeOnly: false, importedSymbols: ["*"], reexportLocalNames: null },
    ])
  })
})

describe("parseFileFromText (re-export importedSymbols / reexportLocalNames)", () => {
  test('`export { a, b } from "m"` records both name lists 1:1', () => {
    const src = `export { a, b } from "./mod"`
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.reExports).toEqual([
      {
        specifier: "./mod",
        typeOnly: false,
        importedSymbols: ["a", "b"],
        reexportLocalNames: ["a", "b"],
      },
    ])
  })

  test('`export { default as Foo } from "m"` records source `default` and local `Foo`', () => {
    const src = `export { default as Foo } from "./mod"`
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.reExports).toEqual([
      {
        specifier: "./mod",
        typeOnly: false,
        importedSymbols: ["default"],
        reexportLocalNames: ["Foo"],
      },
    ])
  })

  test('`export { a as b } from "m"` records source `a` and local `b`', () => {
    const src = `export { a as b } from "./mod"`
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.reExports).toEqual([
      {
        specifier: "./mod",
        typeOnly: false,
        importedSymbols: ["a"],
        reexportLocalNames: ["b"],
      },
    ])
  })

  test('`export * as ns from "m"` records `*` source, null local-names', () => {
    const src = `export * as ns from "./mod"`
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.reExports).toEqual([
      { specifier: "./mod", typeOnly: false, importedSymbols: ["*"], reexportLocalNames: null },
    ])
  })
})
