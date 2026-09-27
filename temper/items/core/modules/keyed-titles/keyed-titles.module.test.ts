import { expect, test } from "bun:test"
import { temperLocationType } from "akasha/temper/catalog/world/temper-location-type/temper-location-type.page-type.ts"
import {
  heldKeyedTitles,
  holdKeyedTitles,
  keyedTitlesFrom,
  titleOf,
} from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import { holdKeyedTitlesFromCheckout } from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.test-fixtures.ts"
import { temperInventoryCurrency } from "akasha/temper/player/holdings/temper-inventory-currency/temper-inventory-currency.page-type.ts"

const PLACES = holdKeyedTitlesFromCheckout(temperLocationType.slug)

const CURRENCIES = holdKeyedTitlesFromCheckout(temperInventoryCurrency.slug)

test("the keys are ordered as their pages say", () => {
  expect(PLACES.keys).toEqual([
    "character",
    "bank",
    "craftbag",
    "housing-storage",
    "house",
    "companion",
    "guild",
  ])
  expect(CURRENCIES.keys[0]).toBe("gold")
  expect(CURRENCIES.keys.length).toBe(16)
})

test("a key is titled as its page is, and a key no page states is titled by itself", () => {
  expect(titleOf(PLACES, "craftbag")).toBe("Craft Bag")
  expect(titleOf(CURRENCIES, "telvarStones")).toBe("Tel Var Stones")
  expect(titleOf(CURRENCIES, "seals")).toBe("seals")
})

test("a key names the page it was read from", () => {
  expect(CURRENCIES.slugs.get("telvarStones")).toBe("tel-var-stones")
})

test("a page stating no title is refused", () => {
  expect(() =>
    keyedTitlesFrom("temper-thing", [{ slug: "one", key: "one", displayOrder: 0 }])
  ).toThrow("temper-thing `one` states no `title`")
})

test("a new reading replaces the one held", () => {
  const again = keyedTitlesFrom(temperLocationType.slug, [
    { slug: "bank", key: "bank", title: "Bank", displayOrder: 0 },
  ])
  holdKeyedTitles(again)
  expect(heldKeyedTitles(temperLocationType.slug)).toBe(again)
  holdKeyedTitles(PLACES)
  expect(heldKeyedTitles(temperLocationType.slug)).toBe(PLACES)
})
