import { expect, test } from "bun:test"
import {
  kioskLocationName,
  kioskNamesFrom,
} from "akasha/temper/economy/trading/pricing/modules/kiosk-location-name/kiosk-location-name.module.code.ts"
import { holdKioskNamesFromCheckout } from "akasha/temper/economy/trading/pricing/modules/kiosk-location-name/kiosk-location-name.module.test-fixtures.ts"

const NAMES = holdKioskNamesFromCheckout()

test("a kiosk is named as its guild trader page titles it", () => {
  expect(kioskLocationName(NAMES, 21)).toBe("Auridon: Skywatch")
  expect(kioskLocationName(NAMES, "111")).toBe("Solstice: Sunport Outlaws Refuge")
})

test("every kiosk from 0 to 111 has a page", () => {
  for (let id = 0; id <= 111; id++) expect(NAMES.has(id)).toBe(true)
})

test("a kiosk no page claims answers with its own number", () => {
  expect(kioskLocationName(NAMES, 9999)).toBe("Location 9999")
})

test("a guild trader page stating no kiosk id is refused", () => {
  expect(() => kioskNamesFrom([{ slug: "nowhere", title: "Nowhere" }])).toThrow(
    "guild trader `nowhere` states no `kioskId`"
  )
})
