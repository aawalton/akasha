import "./test-eso-load-globals"

import { afterEach, beforeEach, expect, test } from "bun:test"
import { classifyPostResponse } from "./rules-list"

const originals = new Map<string, unknown>()

function set(key: string, value: unknown): undefined {
  if (!originals.has(key)) originals.set(key, Reflect.get(globalThis, key))
  Reflect.set(globalThis, key, value)
  return undefined
}

beforeEach(() => {
  set("TRADING_HOUSE_RESULT_POST_PENDING", 10)
  set("TRADING_HOUSE_RESULT_SUCCESS", 20)
  set("TRADING_HOUSE_RESULT_CANT_AFFORD_POST_FEE", 30)
  set("TRADING_HOUSE_RESULT_TOO_MANY_POSTS", 31)
  set("TRADING_HOUSE_RESULT_SEARCH_PENDING", 40)
})

afterEach(() => {
  for (const [k, v] of originals) Reflect.set(globalThis, k, v)
  originals.clear()
})

test("ignores any response whose type is not POST_PENDING", () => {
  expect(classifyPostResponse(40, 20)).toBe("ignore")
  expect(classifyPostResponse(40, 30)).toBe("ignore")
})

test("a POST_PENDING response with SUCCESS is a success", () => {
  expect(classifyPostResponse(10, 20)).toBe("success")
})

test("a POST_PENDING response with any non-success result is a failure", () => {
  expect(classifyPostResponse(10, 30)).toBe("failure")
  expect(classifyPostResponse(10, 31)).toBe("failure")
  expect(classifyPostResponse(10, 999)).toBe("failure")
})
