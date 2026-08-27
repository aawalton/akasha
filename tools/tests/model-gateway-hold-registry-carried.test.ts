import { describe, expect, test } from "bun:test"
import { buildHoldRegistry } from "../lib/model-gateway/hold-registry.ts"

describe("buildHoldRegistry", () => {
  test("an empty registry reports zero held and null oldest", () => {
    const reg = buildHoldRegistry()
    expect(reg.snapshot(1_000)).toEqual({ heldCount: 0, oldestHeldMs: null })
  })

  test("a single hold reports count 1 and its age at now", () => {
    const reg = buildHoldRegistry()
    reg.enter(1_000)
    expect(reg.snapshot(1_600)).toEqual({ heldCount: 1, oldestHeldMs: 600 })
  })

  test("oldestHeldMs tracks the earliest-started live hold", () => {
    const reg = buildHoldRegistry()
    reg.enter(2_000)
    reg.enter(1_000)
    reg.enter(3_000)
    expect(reg.snapshot(5_000)).toEqual({ heldCount: 3, oldestHeldMs: 4_000 })
  })

  test("exit removes a hold; oldest advances to the next-earliest", () => {
    const reg = buildHoldRegistry()
    const oldest = reg.enter(1_000)
    reg.enter(2_000)
    reg.exit(oldest)
    expect(reg.snapshot(5_000)).toEqual({ heldCount: 1, oldestHeldMs: 3_000 })
  })

  test("exit is idempotent — a second release of the same handle is a no-op", () => {
    const reg = buildHoldRegistry()
    const handle = reg.enter(1_000)
    reg.exit(handle)
    reg.exit(handle)
    expect(reg.snapshot(5_000)).toEqual({ heldCount: 0, oldestHeldMs: null })
  })

  test("a snapshot before any elapsed time holds oldestHeldMs at 0", () => {
    const reg = buildHoldRegistry()
    reg.enter(5_000)
    expect(reg.snapshot(4_000)).toEqual({ heldCount: 1, oldestHeldMs: 0 })
  })
})
