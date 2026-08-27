import "../test-eso-load-globals"

import { describe, expect, test } from "bun:test"

import { applyAction } from "../rules-core"
import { dispatchListings } from "../rules-list"
import { BAG_BACKPACK_ID, makeSlot, OTHER, SELF, setSlot, useBagWorld, world } from "./bag-world"

useBagWorld()

describe("dispatchListings — never list another character's item", () => {
  test("backpack pending list with destination character:OTHER is skipped", () => {
    setSlot(BAG_BACKPACK_ID, 0, makeSlot(400, 1))
    applyAction(BAG_BACKPACK_ID, 0, "list", `character:${OTHER}`)
    dispatchListings()
    const listed = world.moves.filter((m) => m.tgtBag === -1)
    expect(listed.length).toBe(0)
  })

  test("backpack pending list with destination character:SELF is listed", () => {
    setSlot(BAG_BACKPACK_ID, 0, makeSlot(401, 1))
    applyAction(BAG_BACKPACK_ID, 0, "list", `character:${SELF}`)
    dispatchListings()
    const listed = world.moves.filter((m) => m.tgtBag === -1)
    expect(listed.length).toBe(1)
  })

  test("backpack pending list with no destination is listed", () => {
    setSlot(BAG_BACKPACK_ID, 0, makeSlot(402, 1))
    applyAction(BAG_BACKPACK_ID, 0, "list", undefined)
    dispatchListings()
    const listed = world.moves.filter((m) => m.tgtBag === -1)
    expect(listed.length).toBe(1)
  })
})
