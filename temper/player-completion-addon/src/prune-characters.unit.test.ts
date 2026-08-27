import { describe, expect, it } from "bun:test"
import { charactersToPrune } from "./prune-characters"

const LIVE = "8796093022208001"
const DELETED = "8796093022208002"

describe("charactersToPrune", () => {
  it("returns a character that is no longer on the account", () => {
    expect(charactersToPrune([LIVE, DELETED], [LIVE])).toEqual([DELETED])
  })

  it("returns nothing when the account reports zero characters", () => {
    expect(charactersToPrune([LIVE, DELETED], [])).toEqual([])
  })

  it("returns nothing when the whole roster is present", () => {
    expect(charactersToPrune([LIVE, DELETED], [DELETED, LIVE])).toEqual([])
  })

  it("returns nothing when nothing is stored", () => {
    expect(charactersToPrune([], [LIVE])).toEqual([])
  })
})
