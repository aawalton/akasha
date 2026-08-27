import { describe, expect, test } from "bun:test"
import { flatImportsFromParsed, parseFileFromText } from "../lib/graph/producers/file/ts-file/parse.ts"

describe("flatImportsFromParsed (new kinds)", () => {
  test("folds jsdoc-import entries with typeOnly: true and kind: jsdoc-import", () => {
    const flat = flatImportsFromParsed({
      staticImports: [],
      dynamicImports: [],
      reExports: [],
      augmentations: [],
      selfAugmentations: [],
      jsdocImports: ["pkg-a", "./local-a"],
      tripleSlashRefs: [],
    })
    expect(flat).toEqual([
      { specifier: "pkg-a", typeOnly: true, kind: "jsdoc-import" },
      { specifier: "./local-a", typeOnly: true, kind: "jsdoc-import" },
    ])
  })

  test("folds triple-slash-ref entries with typeOnly: true and kind: triple-slash-ref", () => {
    const flat = flatImportsFromParsed({
      staticImports: [],
      dynamicImports: [],
      reExports: [],
      augmentations: [],
      selfAugmentations: [],
      jsdocImports: [],
      tripleSlashRefs: ["ambient-pkg", "vite/client"],
    })
    expect(flat).toEqual([
      { specifier: "ambient-pkg", typeOnly: true, kind: "triple-slash-ref" },
      { specifier: "vite/client", typeOnly: true, kind: "triple-slash-ref" },
    ])
  })
})

describe("parseFileFromText (jsdoc-import + triple-slash-ref extraction)", () => {
  test("extracts JSDoc @type {import('pkg').X} with single quotes", () => {
    const src = `
      /** @type {import('pkg-single').Foo} */
      let x
    `
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.jsdocImports).toEqual(["pkg-single"])
    expect(out.tripleSlashRefs).toEqual([])
  })

  test('extracts JSDoc @type {import("pkg").X} with double quotes', () => {
    const src = `
      /** @type {import("pkg-double").Bar} */
      let x
    `
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.jsdocImports).toEqual(["pkg-double"])
  })

  test("extracts JSDoc imports for relative specifiers too (filtering is consumer-side)", () => {
    const src = `
      /** @type {import('./local-mod').Local} */
      let x
    `
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.jsdocImports).toEqual(["./local-mod"])
  })

  test("extracts multiple JSDoc imports in source order", () => {
    const src = `
      /** @type {import('first').A} */
      let a
      /** @type {import('second').B} */
      let b
    `
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.jsdocImports).toEqual(["first", "second"])
  })

  test('extracts triple-slash <reference types="X" /> directive', () => {
    const src = `/// <reference types="ambient-pkg" />\nexport const x = 1\n`
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.tripleSlashRefs).toEqual(["ambient-pkg"])
    expect(out.jsdocImports).toEqual([])
  })

  test('extracts multiple triple-slash <reference types="X" /> in source order', () => {
    const src = `/// <reference types="first-pkg" />\n/// <reference types="second-pkg" />\nexport const x = 1\n`
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.tripleSlashRefs).toEqual(["first-pkg", "second-pkg"])
  })

  test('does NOT extract triple-slash <reference path="..." /> (path-form)', () => {
    const src = `/// <reference path="./other.d.ts" />\nexport const x = 1\n`
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.tripleSlashRefs).toEqual([])
  })

  test('does NOT extract triple-slash <reference lib="..." /> (lib-form)', () => {
    const src = `/// <reference lib="es2022" />\nexport const x = 1\n`
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.tripleSlashRefs).toEqual([])
  })

  test("emits empty arrays when neither construct is present", () => {
    const src = `import x from "real-import"\nexport const y = x\n`
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.jsdocImports).toEqual([])
    expect(out.tripleSlashRefs).toEqual([])
    expect(out.staticImports.map((s) => s.specifier)).toEqual(["real-import"])
  })
})
