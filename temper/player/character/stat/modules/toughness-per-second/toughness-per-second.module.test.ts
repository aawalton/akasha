import { expect, test } from "bun:test"
import {
  armorShareOf,
  toughnessPerSecond,
} from "akasha/temper/player/character/stat/modules/toughness-per-second/toughness-per-second.module.code.ts"

test("armor takes off its rating over 66,000, up to half", () => {
  expect(armorShareOf(33000, 33000)).toBe(0.5)
  expect(armorShareOf(66000, 13200)).toBe(0.35)
})

test("max health is spread over the fight, and what damage is left divides the whole", () => {
  const toughness = { healthMaximum: 30000, armorShare: 0.5, damageTaken: -0.2 }
  expect(toughnessPerSecond(toughness, 570000, 60)).toBe(25000)
})

test("a fight of no seconds gives no toughness", () => {
  expect(toughnessPerSecond({ healthMaximum: 1, armorShare: 0, damageTaken: 0 }, 1, 0)).toBe(0)
})
