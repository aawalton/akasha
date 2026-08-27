import { describe, expect, test } from "bun:test"
import { parseFileFromText } from "../lib/graph/producers/file/ts-file/parse.ts"

describe("parseFileFromText (exports inventory)", () => {
  test("collects function / class / interface / type / enum / namespace declarations", () => {
    const src = `
export function f(): number { return 1 }
export class C {}
export interface I { x: number }
export type T = number
export enum E { A, B }
export namespace N { export const x = 1 }
`
    const out = parseFileFromText("/x.ts", src)
    const byName = new Map(out.exports.map((e) => [e.name, e]))
    expect(byName.get("f")?.kind).toBe("function")
    expect(byName.get("C")?.kind).toBe("class")
    expect(byName.get("I")?.kind).toBe("interface")
    expect(byName.get("I")?.typeOnly).toBe(true)
    expect(byName.get("T")?.kind).toBe("type")
    expect(byName.get("T")?.typeOnly).toBe(true)
    expect(byName.get("E")?.kind).toBe("enum")
    expect(byName.get("N")?.kind).toBe("namespace")
  })

  test("collects `export const` (var-statement) entries — one per binding", () => {
    const src = `export const a = 1, b = 2`
    const out = parseFileFromText("/x.ts", src)
    expect(out.exports.map((e) => ({ name: e.name, kind: e.kind, typeOnly: e.typeOnly }))).toEqual([
      { name: "a", kind: "const", typeOnly: false },
      { name: "b", kind: "const", typeOnly: false },
    ])
  })

  test("distinguishes const / let / var", () => {
    const src = `
export const a = 1
export let b = 2
export var c = 3
`
    const out = parseFileFromText("/x.ts", src)
    expect(out.exports.map((e) => ({ name: e.name, kind: e.kind }))).toEqual([
      { name: "a", kind: "const" },
      { name: "b", kind: "let" },
      { name: "c", kind: "var" },
    ])
  })

  test("collects `export default` declarations under name `default`", () => {
    const src = `export default function f() {}`
    const out = parseFileFromText("/x.ts", src)
    expect(out.exports).toEqual([{ name: "default", line: 1, kind: "default", typeOnly: false }])
  })

  test("collects `export default expr` (assignment) under name `default`", () => {
    const src = `const v = 1; export default v`
    const out = parseFileFromText("/x.ts", src)
    expect(out.exports).toEqual([{ name: "default", line: 1, kind: "default", typeOnly: false }])
  })

  test("collects named re-exports as `reexport` kind", () => {
    const src = `
export { a, b as c } from "./mod"
export type { D } from "./mod"
`
    const out = parseFileFromText("/x.ts", src)
    expect(out.exports.map((e) => ({ name: e.name, kind: e.kind, typeOnly: e.typeOnly }))).toEqual([
      { name: "a", kind: "reexport", typeOnly: false },
      { name: "c", kind: "reexport", typeOnly: false },
      { name: "D", kind: "reexport", typeOnly: true },
    ])
  })

  test("`export { type X } from` element-level type-only is reflected", () => {
    const src = `export { A, type B } from "./mod"`
    const out = parseFileFromText("/x.ts", src)
    expect(out.exports.map((e) => ({ name: e.name, typeOnly: e.typeOnly }))).toEqual([
      { name: "A", typeOnly: false },
      { name: "B", typeOnly: true },
    ])
  })

  test("`export * as ns from` exposes the namespace name as a single reexport", () => {
    const src = `export * as ns from "./mod"`
    const out = parseFileFromText("/x.ts", src)
    expect(out.exports).toEqual([{ name: "ns", line: 1, kind: "reexport", typeOnly: false }])
  })

  test("`export * from` (no clause) emits no enumerable export — handled at reachability", () => {
    const src = `export * from "./mod"`
    const out = parseFileFromText("/x.ts", src)
    expect(out.exports).toEqual([])
  })

  test("collects destructured `export const { a, b } = ...` bindings as separate entries", () => {
    const src = `export const { a, b } = { a: 1, b: 2 }`
    const out = parseFileFromText("/x.ts", src)
    expect(out.exports.map((e) => e.name).sort()).toEqual(["a", "b"])
  })

  test("local `export { x }` without a module specifier is recorded as a `reexport`-kind entry (mirrors collectExports semantics)", () => {
    const src = `
const x = 1
export { x }
`
    const out = parseFileFromText("/x.ts", src)
    expect(out.exports).toEqual([{ name: "x", line: 3, kind: "reexport", typeOnly: false }])
  })

  test("captures signatureTypeRefs on function declarations", () => {
    const src = `
import type { Q } from "./mod"
export function f(x: Q): number { return 0 }
`
    const out = parseFileFromText("/x.ts", src)
    const f = out.exports.find((e) => e.name === "f")
    expect(f).toBeDefined()
    expect(f?.signatureTypeRefs).toEqual(["Q"])
  })

  test("captures signatureTypeRefs on type aliases", () => {
    const src = `
import type { A, B } from "./mod"
export type Pair = { left: A; right: B }
`
    const out = parseFileFromText("/x.ts", src)
    const pair = out.exports.find((e) => e.name === "Pair")
    expect(pair).toBeDefined()
    expect(pair?.signatureTypeRefs?.slice().sort()).toEqual(["A", "B"])
  })

  test("emits 1-based line numbers for every export", () => {
    const src = `// header
export const a = 1
export class C {}
`
    const out = parseFileFromText("/x.ts", src)
    expect(out.exports.find((e) => e.name === "a")?.line).toBe(2)
    expect(out.exports.find((e) => e.name === "C")?.line).toBe(3)
  })

  test("returns empty exports for a file with no exports (alongside imports)", () => {
    const src = `import { x } from "./mod"`
    const out = parseFileFromText("/x.ts", src)
    expect(out.exports).toEqual([])
    expect(out.imports.staticImports).toEqual([
      { specifier: "./mod", typeOnly: false, importedSymbols: ["x"] },
    ])
  })
})
