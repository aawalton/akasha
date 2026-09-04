import { expect, test } from "bun:test"
import { normalizeValue, responseSchema } from "./lua-protocol.module.code.ts"

test("an answer carrying a value parses", () => {
  const parsed = responseSchema.parse({ ok: true, value: 1 })
  expect(parsed).toEqual({ ok: true, value: 1 })
})

test("an answer carrying an error parses", () => {
  const parsed = responseSchema.parse({ ok: false, error: "boom" })
  expect(parsed).toEqual({ ok: false, error: "boom" })
})

test("an answer of another shape is refused", () => {
  expect(() => responseSchema.parse({ ok: true, error: "boom" })).toThrow()
  expect(() => responseSchema.parse({ value: 1 })).toThrow()
})

test("a tagged number becomes that number", () => {
  expect(normalizeValue({ __lua_kind: "nan" })).toBeNaN()
  expect(normalizeValue({ __lua_kind: "inf" })).toBe(Number.POSITIVE_INFINITY)
  expect(normalizeValue({ __lua_kind: "-inf" })).toBe(Number.NEGATIVE_INFINITY)
})

test("a tagged function is left tagged and frozen", () => {
  const held = normalizeValue({ __lua_kind: "function" })
  expect(held).toEqual({ __lua_kind: "function" })
  expect(Object.isFrozen(held)).toBe(true)
})

test("a tag is read at every depth", () => {
  expect(normalizeValue({ a: [{ __lua_kind: "inf" }] })).toEqual({
    a: [Number.POSITIVE_INFINITY],
  })
})

test("a plain value crosses unchanged", () => {
  expect(normalizeValue({ a: 1, b: "two", c: [3, null] })).toEqual({
    a: 1,
    b: "two",
    c: [3, null],
  })
})
