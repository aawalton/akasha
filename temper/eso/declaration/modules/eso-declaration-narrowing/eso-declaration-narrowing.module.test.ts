import { expect, test } from "bun:test"
import { narrowed } from "akasha/temper/eso/declaration/modules/eso-declaration-narrowing/eso-declaration-narrowing.module.code.ts"

const NONE: ReadonlySet<string> = new Set()

test("a name a hand-written declaration states is left out", () => {
  const kept = narrowed([[["type Kind = number", "declare const ONE: number"]]], {
    byHand: new Set(["ONE"]),
    byCompiler: NONE,
  })
  expect(kept).toEqual([[["type Kind = number"]]])
})

test("a group left holding nothing goes", () => {
  const kept = narrowed([[["declare const ONE: number"], ["declare const TWO: number"]]], {
    byHand: new Set(["ONE"]),
    byCompiler: NONE,
  })
  expect(kept).toEqual([[["declare const TWO: number"]]])
})

test("a type alias under a name the compiler declares is left out", () => {
  const kept = narrowed([[["type LinkStyle = number"]]], {
    byHand: NONE,
    byCompiler: new Set(["LinkStyle"]),
  })
  expect(kept).toEqual([[]])
})

test("an interface a hand-written declaration states goes whole, members and all", () => {
  const kept = narrowed(
    [[["interface StatusBarControl extends Control {", "  SetValue: (v?: number) => void", "}"]]],
    {
      byHand: new Set(["StatusBarControl"]),
      byCompiler: NONE,
    }
  )
  expect(kept).toEqual([[]])
})

test("a call a hand-written declaration states goes whole, however many lines it takes", () => {
  const kept = narrowed([[["declare function GetString(", "  this: void", "): string"]]], {
    byHand: new Set(["GetString"]),
    byCompiler: NONE,
  })
  expect(kept).toEqual([[]])
})

test("an enum keeps its values when the alias heading it is stated by hand", () => {
  const kept = narrowed([[["type Kind = number", "declare const ONE: number"]]], {
    byHand: new Set(["Kind"]),
    byCompiler: NONE,
  })
  expect(kept).toEqual([[["declare const ONE: number"]]])
})

test("an interface under such a name is kept, because an interface merges", () => {
  const held = [["interface AnimationTimeline {", "  Play: () => void", "}"]]
  const kept = narrowed([held], { byHand: NONE, byCompiler: new Set(["AnimationTimeline"]) })
  expect(kept).toEqual([held])
})

test("a type naming an alias left out is written as the type that alias named", () => {
  const kept = narrowed(
    [
      [["type LinkStyle = number"]],
      [["declare function GetLink(this: void, linkStyle?: LinkStyle): string"]],
    ],
    { byHand: NONE, byCompiler: new Set(["LinkStyle"]) }
  )
  expect(kept).toEqual([[], [["declare function GetLink(this: void, linkStyle?: number): string"]]])
})

test("a longer name carrying the one left out is untouched", () => {
  const kept = narrowed(
    [
      [["type InstanceType = number"]],
      [["declare function GetPOIInstanceType(this: void): InstanceType"]],
    ],
    { byHand: NONE, byCompiler: new Set(["InstanceType"]) }
  )
  expect(kept).toEqual([[], [["declare function GetPOIInstanceType(this: void): number"]]])
})
