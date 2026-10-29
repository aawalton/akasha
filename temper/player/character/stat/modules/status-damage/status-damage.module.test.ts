import { expect, test } from "bun:test"
import {
  equationOf,
  equationStatsOf,
  equationValue,
} from "akasha/temper/player/character/stat/modules/skill-equation/skill-equation.module.code.ts"
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

const BURNING_CAPTURED =
  "<<1>> = 0.0149285 MaxStat + 0.155898 MaxPower (Dmg, Flame, SingleTarget, DOT)"

type CapturedBurning = {
  readonly fight: string
  readonly magicka: number
  readonly stamina: number
  readonly power: number
  readonly fan: number
  readonly patient: boolean
  readonly critical: boolean
  readonly hit: number
}

const CAPTURED_BURNING_HITS: readonly CapturedBurning[] = [
  {
    fight: "f65",
    magicka: 15128,
    stamina: 28288,
    power: 2754,
    fan: 0.45,
    patient: false,
    critical: false,
    hit: 1294,
  },
  {
    fight: "f65",
    magicka: 15128,
    stamina: 28288,
    power: 2754,
    fan: 0.45,
    patient: true,
    critical: false,
    hit: 1359,
  },
  {
    fight: "f65",
    magicka: 15128,
    stamina: 28288,
    power: 2754,
    fan: 0.45,
    patient: false,
    critical: true,
    hit: 2097,
  },
  {
    fight: "f65",
    magicka: 15128,
    stamina: 28288,
    power: 2754,
    fan: 0.45,
    patient: true,
    critical: true,
    hit: 2202,
  },
  {
    fight: "f66",
    magicka: 15128,
    stamina: 28288,
    power: 2754,
    fan: 0.4,
    patient: false,
    critical: false,
    hit: 1252,
  },
  {
    fight: "f66",
    magicka: 15128,
    stamina: 28288,
    power: 2754,
    fan: 0.4,
    patient: true,
    critical: false,
    hit: 1315,
  },
  {
    fight: "f66",
    magicka: 15128,
    stamina: 28288,
    power: 2754,
    fan: 0.4,
    patient: false,
    critical: true,
    hit: 2028,
  },
  {
    fight: "f66",
    magicka: 15128,
    stamina: 28288,
    power: 2754,
    fan: 0.4,
    patient: true,
    critical: true,
    hit: 2130,
  },
  {
    fight: "f69",
    magicka: 15128,
    stamina: 24779,
    power: 3151,
    fan: 0.4,
    patient: false,
    critical: false,
    hit: 1266,
  },
  {
    fight: "f69",
    magicka: 15128,
    stamina: 24779,
    power: 3151,
    fan: 0.4,
    patient: true,
    critical: false,
    hit: 1329,
  },
  {
    fight: "f69",
    magicka: 15128,
    stamina: 24779,
    power: 3151,
    fan: 0.4,
    patient: true,
    critical: true,
    hit: 2153,
  },
  {
    fight: "f70",
    magicka: 15128,
    stamina: 24779,
    power: 3151,
    fan: 0,
    patient: false,
    critical: false,
    hit: 921,
  },
  {
    fight: "f70",
    magicka: 15128,
    stamina: 24779,
    power: 3151,
    fan: 0,
    patient: true,
    critical: false,
    hit: 967,
  },
  {
    fight: "f70",
    magicka: 15128,
    stamina: 24779,
    power: 3151,
    fan: 0,
    patient: true,
    critical: true,
    hit: 1567,
  },
]

function capturedBurningHit(one: CapturedBurning): number {
  const equation = equationOf(BURNING_CAPTURED)
  const stats = equationStatsOf({
    "magicka-maximum": one.magicka,
    "stamina-maximum": one.stamina,
    "power-spell": one.power,
    "power-weapon": one.power,
  })
  const worked = equationValue(equation, stats)
  if (worked === undefined) throw new Error("the captured Burning equation states no damage")
  const done = 1 + 0.07 + one.fan
  const shown = worked * done * (one.patient ? 1.05 : 1) * (one.critical ? 1.62 : 1)
  return Math.round(shown)
}

test("the Burning equation gives the numbers the game showed in Erin Solstice's fights", () => {
  for (const one of CAPTURED_BURNING_HITS) {
    expect(capturedBurningHit(one)).toBe(one.hit)
  }
})
