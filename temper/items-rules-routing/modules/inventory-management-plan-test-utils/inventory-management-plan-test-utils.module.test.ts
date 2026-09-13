import { describe, expect, test } from "bun:test"
import { makeItem } from "akasha/temper/items-rules-routing/modules/inventory-management-plan-test-utils/inventory-management-plan-test-utils.module.code.ts"

const MANY = 1000

describe("Each item this makes carries an id no other item it made carries.", () => {
  test("a thousand items made in a row have a thousand ids between them", () => {
    const ids = new Set<number>()
    for (let at = 0; at < MANY; at += 1) ids.add(makeItem(`item${at}`).itemId)

    expect(ids.size).toBe(MANY)
  })
})
