import { expect, test } from "bun:test"
import { bitsNeeded } from "akasha/utils/narrow/modules/bits-needed/bits-needed.module.code.ts"

test("a count of one or none still takes one bit", () => {
  expect(bitsNeeded(0)).toBe(1)
  expect(bitsNeeded(1)).toBe(1)
})

test("a count takes the bits that index it", () => {
  expect(bitsNeeded(2)).toBe(1)
  expect(bitsNeeded(3)).toBe(2)
  expect(bitsNeeded(4)).toBe(2)
  expect(bitsNeeded(5)).toBe(3)
  expect(bitsNeeded(256)).toBe(8)
})
