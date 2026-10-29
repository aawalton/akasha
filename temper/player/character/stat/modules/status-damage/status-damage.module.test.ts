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

test("a status effect's damage sums its terms and rounds the sum once", () => {
  expect(statusDamageOf(BURNING, STATS)).toBe(Math.round(0.016 * 28288 + 0.168 * 2754))
})

test("the damage done for the equation's type, delivery and reach grows the sum, rounded once", () => {
  const sum = 0.008 * 28288 + 0.084 * 2754

  expect(statusDamageOf(CHILLED, STATS)).toBe(Math.round(1.06 * sum))
  expect(statusDamageOf(CHILLED, { ...STATS, "damage-done-frost-without-base": 0.1 })).toBe(
    Math.round(1.16 * sum)
  )
  expect(statusDamageOf(BURNING, { ...STATS, "damage-done-frost-without-base": 0.1 })).toBe(
    statusDamageOf(BURNING, STATS)
  )
})

test("the status effect damage bonus joins the damage done sum rather than multiplying it", () => {
  const sum = 0.008 * 28288 + 0.084 * 2754

  expect(statusDamageOf(CHILLED, { ...STATS, "damage-done-status-effect": 5 })).toBe(
    Math.round(6.06 * sum)
  )
})

test("a stat held as a fraction is not floored before the sum", () => {
  const stats = { "stamina-maximum": 57894, "power-weapon": 2494.05 }

  expect(statusDamageOf(BURNING, stats)).toBe(1345)
  expect(statusDamageOf(BURNING, { ...stats, "power-weapon": 2494 })).toBe(1345)
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

type CapturedCritical = {
  readonly fight: string
  readonly criticalDamage: number
  readonly tick: number
  readonly critical: number
}

const CAPTURED_CRITICALS: readonly CapturedCritical[] = [
  { fight: "f78", criticalDamage: 60, tick: 2444, critical: 3910 },
  { fight: "f105", criticalDamage: 60, tick: 2941, critical: 4706 },
  { fight: "f146", criticalDamage: 60, tick: 3720, critical: 5952 },
]

test("a status effect's critical tick inside the Infinite Archive grows by the fight's 60 critical damage", () => {
  for (const one of CAPTURED_CRITICALS) {
    expect(Math.round(one.tick * (1 + one.criticalDamage / 100))).toBe(one.critical)
    expect(Math.round(one.tick * 1.62)).not.toBe(one.critical)
  }
})

function capturedBurningStatusDamage(one: CapturedBurning): number | undefined {
  return statusDamageOf(BURNING_CAPTURED, {
    "magicka-maximum": one.magicka,
    "stamina-maximum": one.stamina,
    "power-spell": one.power,
    "power-weapon": one.power,
    "damage-done-flame-without-base": 0.07 + one.fan,
  })
}

test("a captured Burning tick is the game's number when the sum is rounded once", () => {
  const one = CAPTURED_BURNING_HITS.find((hit) => !hit.patient && !hit.critical)
  if (one === undefined) throw new Error("no captured Burning tick is uncritical and unpatient")

  expect(capturedBurningStatusDamage(one)).toBe(one.hit)
})
