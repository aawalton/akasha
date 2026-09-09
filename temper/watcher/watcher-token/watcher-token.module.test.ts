import { expect, test } from "bun:test"
import { looksLikeWatcherToken, resolveWatcherToken } from "./watcher-token.module.code.ts"

const HEX64 = "a".repeat(64)

const GOOD = `wt_${HEX64}`

test("a token is wt_ followed by sixty-four hex characters", () => {
  expect(looksLikeWatcherToken(GOOD)).toBe(true)
  expect(looksLikeWatcherToken(`wt_${"0123456789abcdef".repeat(4)}`)).toBe(true)
})

test("a token of the wrong length is no token", () => {
  expect(looksLikeWatcherToken(`wt_${"a".repeat(63)}`)).toBe(false)
  expect(looksLikeWatcherToken(`wt_${"a".repeat(65)}`)).toBe(false)
})

test("a token without the prefix is no token", () => {
  expect(looksLikeWatcherToken(HEX64)).toBe(false)
  expect(looksLikeWatcherToken(`tk_${HEX64}`)).toBe(false)
})

test("a token holding anything but lower hex is no token", () => {
  expect(looksLikeWatcherToken(`wt_${"A".repeat(64)}`)).toBe(false)
  expect(looksLikeWatcherToken(`wt_${"g".repeat(64)}`)).toBe(false)
})

test("a well shaped token is answered", () => {
  expect(resolveWatcherToken({ TEMPER_WATCHER_TOKEN: GOOD })).toBe(GOOD)
})

test("space around the token is trimmed before the shape is judged", () => {
  expect(resolveWatcherToken({ TEMPER_WATCHER_TOKEN: `  ${GOOD}\n` })).toBe(GOOD)
})

test("an unset token is refused rather than treated as an empty token", () => {
  expect(() => resolveWatcherToken({})).toThrow("is not set")
  expect(() => resolveWatcherToken({ TEMPER_WATCHER_TOKEN: "" })).toThrow("is not set")
})

test("a token of the wrong shape is refused", () => {
  expect(() => resolveWatcherToken({ TEMPER_WATCHER_TOKEN: "wt_nope" })).toThrow(
    "is not a watcher token"
  )
})

test("what is refused is never answered as a token", () => {
  for (const bad of ["", "wt_nope", HEX64]) {
    let answered: string | null = null
    try {
      answered = resolveWatcherToken({ TEMPER_WATCHER_TOKEN: bad })
    } catch {
      answered = null
    }
    expect(answered).toBeNull()
  }
})
