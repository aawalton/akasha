import { describe, expect, it } from "bun:test"
import { ESO_BAG_BACKPACK, ESO_BAG_WORN } from "./eso-bag-constants"
import { isCharacterLocationRow } from "./location-character-row"

const BAG_BANK = 2
const BAG_GUILDBANK = 3
const BAG_VIRTUAL = 5
const BAG_COMPANION_WORN = 6
const BAG_HOUSE_BANK_ONE = 7

describe("isCharacterLocationRow", () => {
  it("identifies a fully scanned character row", () => {
    expect(isCharacterLocationRow([ESO_BAG_WORN, ESO_BAG_BACKPACK])).toBe(true)
  })

  it("identifies a character row with only one personal bag scanned", () => {
    expect(isCharacterLocationRow([ESO_BAG_BACKPACK])).toBe(true)
    expect(isCharacterLocationRow([ESO_BAG_WORN])).toBe(true)
  })

  it("rejects every other location kind", () => {
    expect(isCharacterLocationRow([BAG_BANK])).toBe(false)
    expect(isCharacterLocationRow([BAG_GUILDBANK])).toBe(false)
    expect(isCharacterLocationRow([BAG_VIRTUAL])).toBe(false)
    expect(isCharacterLocationRow([BAG_COMPANION_WORN])).toBe(false)
    expect(isCharacterLocationRow([BAG_HOUSE_BANK_ONE])).toBe(false)
  })

  it("rejects a row with no bag ids, which carries no evidence of kind", () => {
    expect(isCharacterLocationRow([])).toBe(false)
  })

  it("rejects a row mixing personal and foreign bags", () => {
    expect(isCharacterLocationRow([ESO_BAG_WORN, ESO_BAG_BACKPACK, BAG_GUILDBANK])).toBe(false)
    expect(isCharacterLocationRow([BAG_GUILDBANK, ESO_BAG_BACKPACK])).toBe(false)
  })
})
