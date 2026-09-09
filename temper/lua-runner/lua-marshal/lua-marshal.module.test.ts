import { expect, test } from "bun:test"
import {
  luaLongStringLiteral,
  luaStringLiteral,
  marshalLuaValue,
} from "./lua-marshal.module.code.ts"

test("a missing value and a null value both become nil", () => {
  expect(marshalLuaValue(null)).toBe("nil")
  expect(marshalLuaValue(undefined)).toBe("nil")
})

test("a number json cannot carry becomes the lua expression for that number", () => {
  expect(marshalLuaValue(Number.NaN)).toBe("0/0")
  expect(marshalLuaValue(Number.POSITIVE_INFINITY)).toBe("math.huge")
  expect(marshalLuaValue(Number.NEGATIVE_INFINITY)).toBe("-math.huge")
})

test("an array becomes a lua table keyed from one", () => {
  expect(marshalLuaValue([1, "a", true])).toBe('{1, "a", true}')
})

test("an object becomes a lua table keyed by string", () => {
  expect(marshalLuaValue({ a: 1 })).toBe('{["a"] = 1}')
})

test("a control character is escaped by its code", () => {
  expect(luaStringLiteral("a\u0001b")).toBe('"a\\001b"')
  expect(luaStringLiteral('he said "no"\n')).toBe('"he said \\"no\\"\\n"')
})

test("a value no lua literal can carry is refused", () => {
  expect(() => marshalLuaValue(() => 1)).toThrow("has no Lua literal")
})

test("a long literal is fenced past any closer the text carries", () => {
  expect(luaLongStringLiteral("plain")).toBe("[[\nplain]]")
  expect(luaLongStringLiteral("a ]] b")).toBe("[=[\na ]] b]=]")
  expect(luaLongStringLiteral("a ]] b ]=] c")).toBe("[==[\na ]] b ]=] c]==]")
})
