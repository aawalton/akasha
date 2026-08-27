import { describe, expect, test } from "bun:test"
import { isValidLockKey, selectStaleLockKeys, shouldSeedTemperLock } from "./temper-lock-core"

describe("isValidLockKey", () => {
  test("accepts a non-empty, non-zero unique id", () => {
    expect(isValidLockKey("184467440737095")).toBe(true)
  })
  test("rejects the empty string", () => {
    expect(isValidLockKey("")).toBe(false)
  })
  test("rejects the zero id", () => {
    expect(isValidLockKey("0")).toBe(false)
  })
})

describe("shouldSeedTemperLock", () => {
  test("seeds when natively locked and not already Temper-Locked", () => {
    expect(shouldSeedTemperLock(true, false)).toBe(true)
  })
  test("skips when not natively locked", () => {
    expect(shouldSeedTemperLock(false, false)).toBe(false)
  })
  test("skips when already Temper-Locked (additive + idempotent)", () => {
    expect(shouldSeedTemperLock(true, true)).toBe(false)
  })
})

describe("selectStaleLockKeys", () => {
  test("returns the stored keys absent from live inventory", () => {
    expect(selectStaleLockKeys(["a", "b", "c"], new Set(["b"]))).toEqual(["a", "c"])
  })
  test("returns empty when every stored key is still live", () => {
    expect(selectStaleLockKeys(["a", "b"], new Set(["a", "b"]))).toEqual([])
  })
  test("returns empty when there are no stored keys", () => {
    expect(selectStaleLockKeys([], new Set(["a"]))).toEqual([])
  })
})
