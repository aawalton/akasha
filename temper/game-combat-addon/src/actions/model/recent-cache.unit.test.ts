import { describe, expect, test } from "bun:test"
import { createRecentCache } from "./recent-cache"

describe("RecentCache bump/count within the window", () => {
  test("repeated bumps in the same bucket accumulate", () => {
    const c = createRecentCache(1000, 10)
    expect(c.bump("k", 5000)).toBe(1)
    expect(c.bump("k", 5000)).toBe(2)
    expect(c.bump("k", 5000)).toBe(3)
    expect(c.count("k", 5000)).toBe(3)
  })

  test("bumps spread across buckets still inside the window all count", () => {
    const c = createRecentCache(1000, 10)
    c.bump("k", 5000)
    c.bump("k", 5300)
    c.bump("k", 5600)
    expect(c.count("k", 5600)).toBe(3)
  })

  test("distinct keys are counted independently", () => {
    const c = createRecentCache(1000, 10)
    c.bump("a", 5000)
    c.bump("a", 5000)
    c.bump("b", 5000)
    expect(c.count("a", 5000)).toBe(2)
    expect(c.count("b", 5000)).toBe(1)
  })

  test("a stored count of 0 is never invented — unknown key reads 0", () => {
    const c = createRecentCache(1000, 10)
    expect(c.count("never", 5000)).toBe(0)
  })
})

describe("RecentCache eviction beyond the window", () => {
  test("a bump older than the full window is evicted", () => {
    const c = createRecentCache(1000, 10)
    c.bump("k", 5000)
    expect(c.count("k", 5000)).toBe(1)
    expect(c.count("k", 6100)).toBe(0)
  })

  test("partial roll keeps recent buckets, drops the oldest", () => {
    const c = createRecentCache(1000, 10)
    c.bump("k", 5000)
    c.bump("k", 5900)
    expect(c.count("k", 5900)).toBe(2)
    expect(c.count("k", 6000)).toBe(1)
  })

  test("a single huge time jump clears everything", () => {
    const c = createRecentCache(1000, 10)
    c.bump("k", 5000)
    c.bump("k", 5000)
    expect(c.count("k", 100000)).toBe(0)
  })

  test("bump after eviction starts a fresh count", () => {
    const c = createRecentCache(1000, 10)
    c.bump("k", 5000)
    expect(c.bump("k", 50000)).toBe(1)
  })
})

describe("RecentCache degenerate config", () => {
  test("windowMs < buckets (unit==0) does not divide by zero", () => {
    const c = createRecentCache(5, 10)
    expect(c.bump("k", 1000)).toBe(1)
    expect(c.count("k", 9999)).toBe(1)
  })
})
