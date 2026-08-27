import { describe, expect, test } from "bun:test"
import { flatImportsFromParsed, parseFileFromText } from "../lib/graph/producers/file/ts-file/parse.ts"

describe("parseFileFromText", () => {
  test("collects static default, named, namespace, and side-effect imports", () => {
    const src = `
      import def from "./mod-default"
      import { a, b as c } from "./mod-named"
      import * as ns from "./mod-ns"
      import "./mod-side-effect"
    `
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.staticImports.map((s) => s.specifier)).toEqual([
      "./mod-default",
      "./mod-named",
      "./mod-ns",
      "./mod-side-effect",
    ])
    expect(out.staticImports.every((s) => s.typeOnly === false)).toBe(true)
    expect(out.dynamicImports).toEqual([])
    expect(out.reExports).toEqual([])
  })

  test("collects dynamic imports with string-literal arg", () => {
    const src = `
      const p = import("./mod-dyn")
      async function f() { await import("./mod-dyn-2") }
    `
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.staticImports).toEqual([])
    expect(out.dynamicImports).toEqual(["./mod-dyn", "./mod-dyn-2"])
    expect(out.reExports).toEqual([])
  })

  test("encodes template-literal dynamic imports as [dynamic-import-suffix] with last-span tail", () => {
    const src = "const p = import(`./${name}/foo.ts`)"
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.dynamicImports).toEqual(["[dynamic-import-suffix]/foo.ts"])
  })

  test("template-literal with empty tail is dropped (no static suffix to match)", () => {
    const src = "const p = import(`prefix-${expr}`)"
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.dynamicImports).toEqual([])
  })

  test("template-literal with slash-less tail is dropped (no path component)", () => {
    const src = "const p = import(`mod-${name}.ts`)"
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.dynamicImports).toEqual([])
  })

  test("collects re-exports of all three flavors", () => {
    const src = `
      export { x } from "./mod-a"
      export * from "./mod-b"
      export * as ns from "./mod-c"
      export { y as z } from "./mod-d"
    `
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.staticImports).toEqual([])
    expect(out.dynamicImports).toEqual([])
    expect(out.reExports.map((r) => r.specifier)).toEqual([
      "./mod-a",
      "./mod-b",
      "./mod-c",
      "./mod-d",
    ])
    expect(out.reExports.every((r) => r.typeOnly === false)).toBe(true)
  })

  test("ignores local exports that have no module specifier", () => {
    const src = `
      const a = 1
      export { a }
    `
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.reExports).toEqual([])
  })

  test("walks into nested AST for dynamic imports", () => {
    const src = `
      const arr = [1, 2, 3]
      arr.forEach(() => { import("./mod-deep") })
    `
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.dynamicImports).toEqual(["./mod-deep"])
  })

  test("returns empty result for invalid file path (read failure path)", () => {
    const out = parseFileFromText("/x.ts", "").imports
    expect(out.staticImports).toEqual([])
    expect(out.dynamicImports).toEqual([])
    expect(out.reExports).toEqual([])
  })

  test("`import type X from` is type-only", () => {
    const src = `import type X from "./mod"`
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.staticImports).toEqual([
      { specifier: "./mod", typeOnly: true, importedSymbols: ["default"] },
    ])
  })

  test("`import { type A, type B } from` (all-type named bindings) is type-only", () => {
    const src = `import { type A, type B } from "./mod"`
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.staticImports).toEqual([
      { specifier: "./mod", typeOnly: true, importedSymbols: ["A", "B"] },
    ])
  })

  test("mixed `import { A, type B } from` is NOT type-only (one value binding)", () => {
    const src = `import { A, type B } from "./mod"`
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.staticImports).toEqual([
      { specifier: "./mod", typeOnly: false, importedSymbols: ["A", "B"] },
    ])
  })

  test("`import X from` (default value binding) is NOT type-only", () => {
    const src = `import X from "./mod"`
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.staticImports).toEqual([
      { specifier: "./mod", typeOnly: false, importedSymbols: ["default"] },
    ])
  })

  test("`import * as ns from` (namespace value binding) is NOT type-only", () => {
    const src = `import * as ns from "./mod"`
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.staticImports).toEqual([
      { specifier: "./mod", typeOnly: false, importedSymbols: ["*"] },
    ])
  })

  test("`import type X, { type A } from` (default+named all type) is type-only via clause flag", () => {
    const src = `import type X, { Y } from "./mod"`
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.staticImports).toEqual([
      { specifier: "./mod", typeOnly: true, importedSymbols: ["default", "Y"] },
    ])
  })

  test('side-effect import `import "x"` is NOT type-only (no clause)', () => {
    const src = `import "./mod"`
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.staticImports).toEqual([
      { specifier: "./mod", typeOnly: false, importedSymbols: [null] },
    ])
  })

  test("named import with alias records the source-module name, not the local alias", () => {
    const src = `import { a, b as c } from "./mod"`
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.staticImports).toEqual([
      { specifier: "./mod", typeOnly: false, importedSymbols: ["a", "b"] },
    ])
  })

  test("default + named records ['default', ...names] in clause order", () => {
    const src = `import X, { a, b } from "./mod"`
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.staticImports).toEqual([
      { specifier: "./mod", typeOnly: false, importedSymbols: ["default", "a", "b"] },
    ])
  })

  test("default + namespace records ['default', '*']", () => {
    const src = `import X, * as ns from "./mod"`
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.staticImports).toEqual([
      { specifier: "./mod", typeOnly: false, importedSymbols: ["default", "*"] },
    ])
  })

  test("per-binding type-only annotations still record the name", () => {
    const src = `import { type A, B, type C } from "./mod"`
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.staticImports).toEqual([
      { specifier: "./mod", typeOnly: false, importedSymbols: ["A", "B", "C"] },
    ])
  })

  test('captures `require("spec")` calls into dynamicImports', () => {
    const src = `const x = require("./local")\nconst y = require("@scope/pkg")`
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.dynamicImports).toEqual(["./local", "@scope/pkg"])
  })

  test("ignores require() with non-string-literal arg", () => {
    const src = "const a = require(`./x-${k}.ts`); const b = require(name)"
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.dynamicImports).toEqual([])
  })

  test("ignores require references that aren't a CallExpression", () => {
    const src = `const r = require; const fn = (m: string) => require(m)`
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.dynamicImports).toEqual([])
  })
})

describe("flatImportsFromParsed", () => {
  test("flattens static / dynamic / re-export into one inventory with kind tags", () => {
    const flat = flatImportsFromParsed({
      staticImports: [
        { specifier: "./a", typeOnly: false, importedSymbols: ["x"] },
        { specifier: "./b", typeOnly: true, importedSymbols: ["Y"] },
      ],
      dynamicImports: ["./c"],
      reExports: [
        { specifier: "./d", typeOnly: false, importedSymbols: ["d"], reexportLocalNames: ["d"] },
        { specifier: "./e", typeOnly: true, importedSymbols: ["*"], reexportLocalNames: null },
      ],
      augmentations: [],
      selfAugmentations: [],
      jsdocImports: [],
      tripleSlashRefs: [],
    })
    expect(flat).toEqual([
      { specifier: "./a", typeOnly: false, kind: "static" },
      { specifier: "./b", typeOnly: true, kind: "static" },
      { specifier: "./c", typeOnly: false, kind: "dynamic" },
      { specifier: "./d", typeOnly: false, kind: "re-export" },
      { specifier: "./e", typeOnly: true, kind: "re-export" },
    ])
  })

  test("excludes [dynamic-import-suffix] markers from the flat inventory", () => {
    const flat = flatImportsFromParsed({
      staticImports: [],
      dynamicImports: ["./real", "[dynamic-import-suffix]/foo.ts"],
      reExports: [],
      augmentations: [],
      selfAugmentations: [],
      jsdocImports: [],
      tripleSlashRefs: [],
    })
    expect(flat).toEqual([{ specifier: "./real", typeOnly: false, kind: "dynamic" }])
  })

  test("preserves source order across kinds", () => {
    const flat = flatImportsFromParsed({
      staticImports: [{ specifier: "./s1", typeOnly: false, importedSymbols: ["x"] }],
      dynamicImports: ["./d1"],
      reExports: [
        {
          specifier: "./r1",
          typeOnly: false,
          importedSymbols: ["r1"],
          reexportLocalNames: ["r1"],
        },
      ],
      augmentations: [],
      selfAugmentations: [],
      jsdocImports: ["./j1"],
      tripleSlashRefs: ["./t1"],
    })
    expect(flat.map((e) => e.specifier)).toEqual(["./s1", "./d1", "./r1", "./j1", "./t1"])
  })

  test("emits empty inventory when no specifiers are present", () => {
    const flat = flatImportsFromParsed({
      staticImports: [],
      dynamicImports: [],
      reExports: [],
      augmentations: [],
      selfAugmentations: [],
      jsdocImports: [],
      tripleSlashRefs: [],
    })
    expect(flat).toEqual([])
  })
})
