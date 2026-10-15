import { expect, test } from "bun:test"
import {
  armorShareOf,
  toughnessPerSecond,
} from "akasha/temper/player/character/stat/modules/toughness-per-second/toughness-per-second.module.code.ts"

test("armor takes off its rating over 66,000, up to half", () => {
  expect(armorShareOf(33000, 33000)).toBe(0.5)
  expect(armorShareOf(66000, 13200)).toBe(0.35)
})

test("each tick's killing hit is max health, shields up and healing landing, over damage left", () => {
  const toughness = { healthMaximum: 30000, armorShare: 0.5, damageTaken: -0.2 }
  const ticks = [
    { healing: 2000, shield: 0 },
    { healing: 0, shield: 10000 },
  ]
  expect(toughnessPerSecond(toughness, ticks)).toBe((80000 + 100000) / 2)
})

test("a fight of no ticks gives no toughness", () => {
  expect(toughnessPerSecond({ healthMaximum: 1, armorShare: 0, damageTaken: 0 }, [])).toBe(0)
})
