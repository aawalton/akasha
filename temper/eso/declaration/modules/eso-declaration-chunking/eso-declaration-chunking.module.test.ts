import { expect, test } from "bun:test"
import {
  assigned,
  groupKey,
  nameIn,
  pagedBy,
  slugsFor,
  spilled,
} from "akasha/temper/eso/declaration/modules/eso-declaration-chunking/eso-declaration-chunking.module.code.ts"

const CEILING = 25

function sizeOf(groups: readonly (readonly string[])[]): number {
  return groups.flat().join("\n").length
}

test("the name a line states is read from the word the declaration opens with", () => {
  expect(nameIn("declare const ONE: number")).toBe("ONE")
  expect(nameIn("declare function GetOne(this: void): number")).toBe("GetOne")
  expect(nameIn("type Kind = number")).toBe("Kind")
  expect(nameIn("interface Widget extends Control {")).toBe("Widget")
  expect(nameIn("  Member: () => void")).toBeNull()
})

test("a group is keyed by the name its first line states", () => {
  expect(groupKey(["type Kind = number", "declare const ONE: number"])).toBe("Kind")
  expect(groupKey([])).toBeNull()
})

test("every name a page states is filed against that page", () => {
  const held = pagedBy(["type Kind = number\ndeclare const ONE: number", "type Other = number"])
  expect(held.get("Kind")).toBe(0)
  expect(held.get("ONE")).toBe(0)
  expect(held.get("Other")).toBe(1)
})

test("a group goes to the page already holding the name it states", () => {
  const pages = assigned(
    [["type Other = number"], ["type Kind = number"]],
    new Map([
      ["Kind", 1],
      ["Other", 0],
    ])
  )
  expect(pages).toEqual([[["type Other = number"]], [["type Kind = number"]]])
})

test("a group no page holds goes to the page holding the group before it", () => {
  const pages = assigned([["type Kind = number"], ["type Fresh = number"]], new Map([["Kind", 1]]))
  expect(pages).toEqual([[], [["type Kind = number"], ["type Fresh = number"]]])
})

test("a run changing nothing divides nothing again", () => {
  const groups = [["type A = number"], ["type B = number"], ["type C = number"]]
  const pagedAt = new Map([
    ["A", 0],
    ["B", 1],
    ["C", 1],
  ])
  expect(assigned(groups, pagedAt)).toEqual([
    [["type A = number"]],
    [["type B = number"], ["type C = number"]],
  ])
})

test("a page over the ceiling hands its last group on, making a page where none follows", () => {
  const pages = spilled([[["aaaaaaaaaa"], ["bbbbbbbbbb"], ["cccccccccc"]]], sizeOf, CEILING)
  expect(pages).toEqual([[["aaaaaaaaaa"], ["bbbbbbbbbb"]], [["cccccccccc"]]])
})

test("a page holding one group over the ceiling is left whole", () => {
  const one = [["aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"]]
  expect(spilled([one], sizeOf, CEILING)).toEqual([one])
})

test("a page left holding nothing goes", () => {
  expect(spilled([[], [["a"]]], sizeOf, CEILING)).toEqual([[["a"]]])
})

test("a page keeps the slug it has and a page made takes the next number", () => {
  expect(slugsFor("eso-enums", ["eso-enums-01", "eso-enums-02"], 3)).toEqual([
    "eso-enums-01",
    "eso-enums-02",
    "eso-enums-03",
  ])
})

test("an unnumbered single page keeps its name when a second page arrives beside it", () => {
  expect(slugsFor("eso-events", ["eso-events"], 2)).toEqual(["eso-events", "eso-events-02"])
})
