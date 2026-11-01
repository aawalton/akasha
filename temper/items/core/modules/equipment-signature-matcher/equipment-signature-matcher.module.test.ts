import { expect, test } from "bun:test"
import { firstUnfilledWanter } from "akasha/temper/items/core/modules/equipment-signature-matcher/equipment-signature-matcher.module.code.ts"

const MASK = { equipType: 1, traitType: 18, quality: 5, armorType: 2, setId: 270 }
const RING = { equipType: 12, traitType: 31, quality: 5 }

const wearing =
  (...pieces: ReadonlyArray<object>) =>
  (charId: string) =>
    charId === "111" ? pieces : []

test("gear alike to what a character already wears goes to no character", () => {
  const wanted = [{ esoCharId: "111", ...MASK }]
  expect(firstUnfilledWanter(wanted, MASK, wearing(MASK))).toBeUndefined()
  expect(firstUnfilledWanter(wanted, MASK, wearing())?.esoCharId).toBe("111")
})

test("a piece of another set in the slot leaves the slot wanting", () => {
  const wanted = [{ esoCharId: "111", ...MASK }]
  expect(firstUnfilledWanter(wanted, MASK, wearing({ ...MASK, setId: 1 }))?.esoCharId).toBe("111")
})

test("a second piece alike goes where the build wants two and the character wears one", () => {
  const wanted = [
    { esoCharId: "111", ...RING },
    { esoCharId: "111", ...RING },
  ]
  expect(firstUnfilledWanter(wanted, RING, wearing(RING))?.esoCharId).toBe("111")
  expect(firstUnfilledWanter(wanted, RING, wearing(RING, RING))).toBeUndefined()
})

test("gear one character already wears goes to the next character wanting it", () => {
  const wanted = [
    { esoCharId: "111", ...MASK },
    { esoCharId: "222", ...MASK },
  ]
  expect(firstUnfilledWanter(wanted, MASK, wearing(MASK))?.esoCharId).toBe("222")
})
