import { describe, expect, test } from "bun:test"
import {
  type ApplyInvalidationsView,
  applyPendingInvalidations,
  type PendingInvalidation,
} from "./apply-invalidations.module.code.ts"

const ALL_KEYS = ["achievementCatalog", "recipeCatalog", "loreLibraryCatalog"] as const

function svBase(): ApplyInvalidationsView {
  return {
    lastSeenInvalidateVersion: 0,
    completed: true,
    presentDomainKeys: ["achievementCatalog", "recipeCatalog", "loreLibraryCatalog"],
  }
}

describe("applyPendingInvalidations", () => {
  test("no side-file → no change (no-op)", () => {
    const sv = svBase()
    const result = applyPendingInvalidations(sv, undefined, ALL_KEYS)
    expect(result).toEqual({
      kind: "noop",
      next: sv,
    })
  })

  test("side-file with invalidateVersion <= lastSeen → no change", () => {
    const sv = { ...svBase(), lastSeenInvalidateVersion: 5 }
    const sf: PendingInvalidation = {
      version: 1,
      invalidateVersion: 5,
      invalidateDomains: ["achievementCatalog"],
    }
    expect(applyPendingInvalidations(sv, sf, ALL_KEYS).kind).toBe("noop")
  })

  test("higher invalidateVersion + named domains → deletes those + completed=false + bumps lastSeen", () => {
    const sv = { ...svBase(), lastSeenInvalidateVersion: 2 }
    const sf: PendingInvalidation = {
      version: 1,
      invalidateVersion: 3,
      invalidateDomains: ["recipeCatalog"],
    }
    const result = applyPendingInvalidations(sv, sf, ALL_KEYS)
    expect(result.kind).toBe("applied")
    expect(result.next.lastSeenInvalidateVersion).toBe(3)
    expect(result.next.completed).toBe(false)
    expect(result.next.presentDomainKeys).toEqual(["achievementCatalog", "loreLibraryCatalog"])
  })

  test("higher invalidateVersion + empty domains → treated as --all", () => {
    const sv = svBase()
    const sf: PendingInvalidation = {
      version: 1,
      invalidateVersion: 1,
      invalidateDomains: [],
    }
    const result = applyPendingInvalidations(sv, sf, ALL_KEYS)
    expect(result.kind).toBe("applied")
    expect(result.next.completed).toBe(false)
    expect(result.next.presentDomainKeys).toEqual([])
    expect(result.next.lastSeenInvalidateVersion).toBe(1)
  })

  test("unknown domain in the request is ignored without throwing", () => {
    const sv = svBase()
    const sf: PendingInvalidation = {
      version: 1,
      invalidateVersion: 1,
      invalidateDomains: ["totallyNotADomain"],
    }
    const result = applyPendingInvalidations(sv, sf, ALL_KEYS)
    expect(result.kind).toBe("applied")
    expect(result.next.presentDomainKeys).toEqual([
      "achievementCatalog",
      "recipeCatalog",
      "loreLibraryCatalog",
    ])
    expect(result.next.completed).toBe(false)
    expect(result.next.lastSeenInvalidateVersion).toBe(1)
  })

  test("idempotent — re-applying the same invalidateVersion is a no-op the second time", () => {
    const sv = svBase()
    const sf: PendingInvalidation = {
      version: 1,
      invalidateVersion: 4,
      invalidateDomains: ["recipeCatalog"],
    }
    const first = applyPendingInvalidations(sv, sf, ALL_KEYS)
    expect(first.kind).toBe("applied")
    const second = applyPendingInvalidations(first.next, sf, ALL_KEYS)
    expect(second.kind).toBe("noop")
    expect(second.next).toEqual(first.next)
  })
})
