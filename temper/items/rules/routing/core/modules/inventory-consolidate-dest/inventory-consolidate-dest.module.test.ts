import { describe, expect, test } from "bun:test"
import {
  carriesStorage,
  isStorageCarrierMove,
} from "akasha/temper/items/rules/routing/core/modules/inventory-consolidate-dest/inventory-consolidate-dest.module.code.ts"

const ERIN = "8796093022338107"

const CERIA = "8796093045974297"

describe("Only the storage carrier touches a gathering place.", () => {
  test("the character heading the priority list carries storage, and no other does", () => {
    expect(carriesStorage([ERIN, CERIA], ERIN)).toBe(true)
    expect(carriesStorage([ERIN, CERIA], CERIA)).toBe(false)
  })

  test("where no priority list is known, whoever is playing carries storage", () => {
    expect(carriesStorage(undefined, CERIA)).toBe(true)
    expect(carriesStorage([], CERIA)).toBe(true)
  })

  test("the guild bank, house storage, the furniture vault and a house each gather", () => {
    for (const destination of [
      "guild-bank",
      "guild-bank:Walton Mountain",
      "house-storage",
      "house-storage:Wealth",
      "furniture-vault",
      "house:1060",
    ]) {
      expect(isStorageCarrierMove(destination, false)).toBe(true)
    }
    expect(isStorageCarrierMove("bank", false)).toBe(false)
    expect(isStorageCarrierMove(`character:${CERIA}`, false)).toBe(false)
  })
})
