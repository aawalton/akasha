import { expect, test } from "bun:test"
import { onsetPercentByName } from "akasha/temper/player/character/stat/modules/onset-scaled-buff/onset-scaled-buff.module.code.ts"

const at = (power: number) => onsetPercentByName("Merciless Charge", { weapon: power, spell: 0 })

test("Merciless Charge gives the share the readings showed at each power it began at", () => {
  expect([at(3351), at(4430), at(4564), at(6740)]).toEqual([6, 7, 8, 12])
})

test("Merciless Charge reads the higher of Weapon and Spell Damage", () => {
  expect(onsetPercentByName("Merciless Charge", { weapon: 1000, spell: 4564 })).toBe(8)
})

test("Merciless Charge listed with no power at its start gives no share", () => {
  expect(onsetPercentByName("Merciless Charge", undefined)).toBeUndefined()
})
