import { expect, test } from "bun:test"
import { EquipmentMappingsStale } from "./generate-addon-data.module.code.ts"

// Both callers of this module sort a stale-mappings throw from every other throw by `instanceof`,
// answering a data error for the one and a failure for the other. These hold that apart.

test("a stale-mappings throw is caught as itself", () => {
  const thrown = new EquipmentMappingsStale("the tables disagree")
  expect(thrown instanceof EquipmentMappingsStale).toBe(true)
})

test("a stale-mappings throw is an Error, so a caller catching Error still catches it", () => {
  expect(new EquipmentMappingsStale("the tables disagree") instanceof Error).toBe(true)
})

test("a plain Error is not mistaken for stale mappings", () => {
  expect(new Error("the store would not answer") instanceof EquipmentMappingsStale).toBe(false)
})

test("a stale-mappings throw carries the message it was given", () => {
  expect(new EquipmentMappingsStale("the tables disagree").message).toBe("the tables disagree")
})

test("a stale-mappings throw is caught by name across a throw site", () => {
  const catching = (): string => {
    try {
      throw new EquipmentMappingsStale("the tables disagree")
    } catch (thrown) {
      return thrown instanceof EquipmentMappingsStale ? "stale" : "other"
    }
  }
  expect(catching()).toBe("stale")
})
