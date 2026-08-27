import { describe, expect, it } from "bun:test"
import { makeItem } from "./inventory-management-plan.test-utils"

describe("makeItem fixture — itemId distinctness", () => {
  it("yields distinct itemIds across many sequential calls", () => {
    const ids = new Set<number>()
    for (let i = 0; i < 1000; i++) ids.add(makeItem(`item${i}`).itemId)
    expect(ids.size).toBe(1000)
  })
})
