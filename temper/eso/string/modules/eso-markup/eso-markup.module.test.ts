import { expect, test } from "bun:test"
import { markupPieces } from "akasha/temper/eso/string/modules/eso-markup/eso-markup.module.code.ts"

test("a colored run is a piece in that color between plain pieces", () => {
  expect(markupPieces("Deals |cffffff0|r Physical Damage")).toEqual([
    { kind: "text", text: "Deals ", color: undefined },
    { kind: "text", text: "0", color: "ffffff" },
    { kind: "text", text: " Physical Damage", color: undefined },
  ])
})

test("a color the markup never ends runs to the end of the text", () => {
  expect(markupPieces("|c00FF00on")).toEqual([{ kind: "text", text: "on", color: "00FF00" }])
})

test("an end closes only the innermost color", () => {
  expect(markupPieces("|cff0000a|c00ff00b|rc|rd")).toEqual([
    { kind: "text", text: "a", color: "ff0000" },
    { kind: "text", text: "b", color: "00ff00" },
    { kind: "text", text: "c", color: "ff0000" },
    { kind: "text", text: "d", color: undefined },
  ])
})

test("a stray end, a color with no six hex digits and an unknown marker are dropped", () => {
  expect(markupPieces("a|rb|czzc|xd|e")).toEqual([
    { kind: "text", text: "abzzcd", color: undefined },
  ])
})

test("an icon is a piece of its own, and a link or underline keeps only its words", () => {
  expect(
    markupPieces("|t32:32:art/gold.dds|t |H1:item:1|hSword|h |u1:0:0:x|u|l0:1:1:0:1:ffffff|l")
  ).toEqual([
    { kind: "icon", icon: "32:32:art/gold.dds", color: undefined },
    { kind: "text", text: " Sword x", color: undefined },
  ])
})
