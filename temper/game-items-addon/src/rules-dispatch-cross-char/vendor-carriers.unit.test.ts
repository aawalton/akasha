import "../test-eso-load-globals"

import { describe, expect, test } from "bun:test"

import { applyAction, getPendingAction, getPendingDestination } from "../rules-core"
import { BAG_BACKPACK_ID, getSlot, makeSlot, OTHER, SELF, setSlot, useBagWorld } from "./bag-world"

useBagWorld()

describe("applyAction — vendor cross-char carriers", () => {
  test("cross-char non-stolen sell sets a pending 'sell' carrier (not junk)", () => {
    setSlot(BAG_BACKPACK_ID, 0, makeSlot(111, 1))
    applyAction(BAG_BACKPACK_ID, 0, "sell", `character:${OTHER}`)
    expect(getPendingAction(BAG_BACKPACK_ID, 0)).toBe("sell")
    expect(getPendingDestination(BAG_BACKPACK_ID, 0)).toBe(`character:${OTHER}`)
    expect(getSlot(BAG_BACKPACK_ID, 0)?.junk).toBe(false)
  })

  test("same-char non-stolen sell marks junk, sets no carrier (regression guard)", () => {
    setSlot(BAG_BACKPACK_ID, 0, makeSlot(112, 1))
    applyAction(BAG_BACKPACK_ID, 0, "sell", `character:${SELF}`)
    expect(getPendingAction(BAG_BACKPACK_ID, 0)).toBeUndefined()
    expect(getSlot(BAG_BACKPACK_ID, 0)?.junk).toBe(true)
  })

  test("destination-less non-stolen sell marks junk (regression guard)", () => {
    setSlot(BAG_BACKPACK_ID, 0, makeSlot(113, 1))
    applyAction(BAG_BACKPACK_ID, 0, "sell", undefined)
    expect(getPendingAction(BAG_BACKPACK_ID, 0)).toBeUndefined()
    expect(getSlot(BAG_BACKPACK_ID, 0)?.junk).toBe(true)
  })

  test("cross-char list carries the destination", () => {
    setSlot(BAG_BACKPACK_ID, 0, makeSlot(114, 1))
    applyAction(BAG_BACKPACK_ID, 0, "list", `character:${OTHER}`)
    expect(getPendingAction(BAG_BACKPACK_ID, 0)).toBe("list")
    expect(getPendingDestination(BAG_BACKPACK_ID, 0)).toBe(`character:${OTHER}`)
  })

  test("cross-char stolen sell carries the destination on the fence-sell carrier", () => {
    setSlot(BAG_BACKPACK_ID, 0, makeSlot(115, 1, { stolen: true }))
    applyAction(BAG_BACKPACK_ID, 0, "sell", `character:${OTHER}`)
    expect(getPendingAction(BAG_BACKPACK_ID, 0)).toBe("fence-sell")
    expect(getPendingDestination(BAG_BACKPACK_ID, 0)).toBe(`character:${OTHER}`)
  })
})
