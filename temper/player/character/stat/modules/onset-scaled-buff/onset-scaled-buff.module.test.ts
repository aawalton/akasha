import { expect, test } from "bun:test"
import {
  onsetPercentByName,
  sheetPercentByName,
} from "akasha/temper/player/character/stat/modules/onset-scaled-buff/onset-scaled-buff.module.code.ts"

const at = (power: number) => onsetPercentByName("Merciless Charge", { weapon: power, spell: 0 })

test("Merciless Charge gives the share the readings showed at each power it began at", () => {
  expect([at(3351), at(4430), at(4564), at(6740)]).toEqual([6, 7, 8, 12])
})

test("Merciless Charge reads the higher of Weapon and Spell Damage", () => {
  expect(onsetPercentByName("Merciless Charge", { weapon: 1000, spell: 4564 })).toBe(8)
})

const row = (percent: number) => ({
  category: "Damage Bonuses",
  format: "flat-and-percent",
  percent,
})

test("Merciless Charge with no power at its start takes the sheet's share less known buffs", () => {
  const sheet = { "physical-damage": row(8), "fire-damage": row(9), "critical-damage": row(10) }
  expect(sheetPercentByName("Merciless Charge", sheet, 1)).toBe(7)
  expect(sheetPercentByName("Merciless Charge", sheet, 8)).toBeUndefined()
  expect(sheetPercentByName("Merciless Charge", { "physical-damage": row(20) }, 0)).toBeUndefined()
  expect(sheetPercentByName("Merciless Charge", undefined, 0)).toBeUndefined()
})

test("Merciless Charge listed with no power at its start gives no share", () => {
  expect(onsetPercentByName("Merciless Charge", undefined)).toBeUndefined()
})
