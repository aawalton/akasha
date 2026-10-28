import { expect, test } from "bun:test"
import { statusDamageOf } from "akasha/temper/player/character/stat/modules/status-damage/status-damage.module.code.ts"

const BURNING = "<<1>> = 0.016 MaxStat + 0.168 MaxPower (Dmg, Flame, SingleTarget, DOT)"

const CHILLED = "<<1>> = 0.008 MaxStat + 0.084 MaxPower (Dmg, Frost, SingleTarget, Direct)"

const STATS = {
  "magicka-maximum": 15128,
  "stamina-maximum": 28288,
  "power-spell": 2754,
  "power-weapon": 2754,
  "damage-done-direct": 0.06,
}

test("a status effect's damage floors each term of its equation and sums them", () => {
  expect(statusDamageOf(BURNING, STATS)).toBe(Math.floor(0.016 * 28288) + Math.floor(0.168 * 2754))
})

test("the damage done for the equation's type, delivery and reach grows it, rounded", () => {
  const flooredSum = Math.floor(0.008 * 28288) + Math.floor(0.084 * 2754)

  expect(statusDamageOf(CHILLED, STATS)).toBe(Math.round(1.06 * flooredSum))
  expect(statusDamageOf(CHILLED, { ...STATS, "damage-done-frost-without-base": 0.1 })).toBe(
    Math.round(1.16 * flooredSum)
  )
  expect(statusDamageOf(BURNING, { ...STATS, "damage-done-frost-without-base": 0.1 })).toBe(914)
})

test("a stat held as a fraction is floored with its term, as the game holds it", () => {
  const stats = { "stamina-maximum": 57894, "power-weapon": 2494.05 }

  expect(statusDamageOf(BURNING, stats)).toBe(1345)
  expect(statusDamageOf(BURNING, { ...stats, "power-weapon": 2494 })).toBe(1344)
})

test("an equation dealing no damage gives no number", () => {
  expect(statusDamageOf("<<1>> = 10 seconds (Constant)", STATS)).toBeUndefined()
})
