import { expect, test } from "bun:test"
import type { AutomationSettings } from "../automation-toggles/automation-toggles.module.code.ts"
import { applyToggle, parseScope, parseValue } from "./automation-toggle-change.module.code.ts"

const EMPTY: AutomationSettings = { characters: {}, companions: {} }

test("a value is read as on, off, or gone", () => {
  expect(parseValue("true")).toBe(true)
  expect(parseValue("false")).toBe(false)
  expect(parseValue("null")).toBe(null)
})

test("a value that is none of the three is refused", () => {
  expect(() => parseValue("yes")).toThrow("--value must be")
})

test("a toggle only characters carry needs no target under the global scope", () => {
  expect(parseScope("global", "food", undefined)).toEqual({ kind: "global", target: "characters" })
})

test("a toggle both sides carry is ambiguous under the global scope", () => {
  expect(() => parseScope("global", "equipment", undefined)).toThrow("is ambiguous")
})

test("a target tells the two sides apart", () => {
  expect(parseScope("global", "equipment", "companions")).toEqual({
    kind: "global",
    target: "companions",
  })
})

test("a target contradicting the one side its toggle applies to is refused", () => {
  expect(() => parseScope("global", "food", "companions")).toThrow("contradicts toggle")
})

test("a toggle no side carries is refused under the global scope", () => {
  expect(() => parseScope("global", "mounts", undefined)).toThrow("unknown toggle")
})

test("a character scope names one character", () => {
  expect(parseScope("character:@alan__nord", "food", undefined)).toEqual({
    kind: "character",
    esoCharId: "@alan__nord",
  })
})

test("a character scope naming nobody is refused", () => {
  expect(() => parseScope("character:", "food", undefined)).toThrow("requires an esoCharId")
})

test("a companion scope naming nobody is refused", () => {
  expect(() => parseScope("companion:", "skills", undefined)).toThrow("requires a companionId")
})

test("a character scope refuses a toggle only companions carry", () => {
  expect(() => parseScope("character:@alan__nord", "mounts", undefined)).toThrow(
    "is not a character toggle"
  )
})

test("a companion scope refuses a toggle only characters carry", () => {
  expect(() => parseScope("companion:bastian", "food", undefined)).toThrow(
    "is not a companion toggle"
  )
})

test("a target outside the global scope is refused", () => {
  expect(() => parseScope("character:@alan__nord", "food", "characters")).toThrow(
    "only meaningful with --scope=global"
  )
})

test("a scope spelled none of the three ways is refused", () => {
  expect(() => parseScope("everyone", "food", undefined)).toThrow("--scope must be")
})

test("a toggle switched on for one character reaches nobody else", () => {
  const next = applyToggle(EMPTY, { kind: "character", esoCharId: "@a" }, "food", true)
  expect(next.characters).toEqual({ "@a": { food: true } })
  expect(next.companions).toEqual({})
})

test("the settings handed in are left as they were", () => {
  applyToggle(EMPTY, { kind: "character", esoCharId: "@a" }, "food", true)
  expect(EMPTY.characters).toEqual({})
})

test("a toggle given nothing is taken away rather than switched off", () => {
  const on = applyToggle(EMPTY, { kind: "character", esoCharId: "@a" }, "food", true)
  const gone = applyToggle(on, { kind: "character", esoCharId: "@a" }, "food", null)
  expect(gone.characters["@a"]).toEqual({})
  expect("food" in (gone.characters["@a"] ?? {})).toBe(false)
})

test("a toggle set for everyone lands under the global scope", () => {
  const next = applyToggle(EMPTY, { kind: "global", target: "characters" }, "food", false)
  expect(next.global).toEqual({ characters: { food: false } })
})

test("a companion toggle lands under the companion it names", () => {
  const next = applyToggle(EMPTY, { kind: "companion", companionId: "bastian" }, "skills", true)
  expect(next.companions).toEqual({ bastian: { skills: true } })
})

test("a toggle the named side does not carry is refused before anything changes", () => {
  expect(() =>
    applyToggle(EMPTY, { kind: "companion", companionId: "bastian" }, "food", true)
  ).toThrow("is not a companion toggle")
})

test("a second toggle sits beside the first rather than replacing it", () => {
  const one = applyToggle(EMPTY, { kind: "character", esoCharId: "@a" }, "food", true)
  const two = applyToggle(one, { kind: "character", esoCharId: "@a" }, "potions", true)
  expect(two.characters["@a"]).toEqual({ food: true, potions: true })
})
