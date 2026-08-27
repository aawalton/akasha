import { describe, expect, test } from "bun:test"
import { parseFileFromText } from "../lib/graph/producers/file/ts-file/parse.ts"

describe("parseFileFromText (declare module augmentation walker)", () => {
  test('`declare module "m" { interface A {} }` produces a target augmentation entry', () => {
    const src = `declare module "@scope/foo" { interface A {} }`
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.staticImports).toEqual([])
    expect(out.selfAugmentations).toEqual([])
    expect(out.augmentations).toEqual([{ specifier: "@scope/foo", augmentedInterfaceNames: ["A"] }])
  })

  test("augmentation body with local type refs produces both entries (target + self)", () => {
    const src = `declare module "@scope/foo" { interface A { x: SomeLocal } }`
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.augmentations).toEqual([{ specifier: "@scope/foo", augmentedInterfaceNames: ["A"] }])
    expect(out.selfAugmentations).toEqual([{ localTypeRefs: ["SomeLocal"] }])
  })

  test("augmentation body with type ref to augmented interface name excludes it from selfAugmentations", () => {
    const src = `declare module "@scope/foo" { interface A { other: B }; interface B { self: A } }`
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.augmentations).toEqual([
      { specifier: "@scope/foo", augmentedInterfaceNames: ["A", "B"] },
    ])
    expect(out.selfAugmentations).toEqual([])
  })

  test('wildcard module declaration `declare module "*.css"` produces neither entry', () => {
    const src = `declare module "*.css" { const x: string; export = x }`
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.augmentations).toEqual([])
    expect(out.selfAugmentations).toEqual([])
  })

  test('wildcard glob `declare module "@scope/*"` is treated as wildcard (skipped)', () => {
    const src = `declare module "@scope/*" { interface X {} }`
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.augmentations).toEqual([])
    expect(out.selfAugmentations).toEqual([])
  })

  test('empty-body augmentation `declare module "m" {}` produces neither entry', () => {
    const src = `declare module "@scope/foo" {}`
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.augmentations).toEqual([])
    expect(out.selfAugmentations).toEqual([])
  })

  test("augmentation local type refs are deduplicated (Set semantics)", () => {
    const src = `declare module "@scope/foo" { interface A { x: T; y: T; z: U } }`
    const out = parseFileFromText("/x.ts", src).imports
    expect(out.selfAugmentations).toHaveLength(1)
    expect(out.selfAugmentations[0]?.localTypeRefs.slice().sort()).toEqual(["T", "U"])
  })
})
